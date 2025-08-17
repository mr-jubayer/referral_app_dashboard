/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

interface Refer {
  _id: string;
  userId: string;
  amount: number;
  phone: string;
  status: string;
  method: string;
}

function ReferralTree() {
  const [rootUsers, setRootUsers] = useState<any[]>([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getRootUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/refer-tree/root`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRootUsers(response.data.data.users);
      } catch (error: any) {
        if (!error?.response?.data?.success) {
          localStorage.clear();
          navigate("/login");
        }
      }
    };
    getRootUsers();
  }, []);

  if (!rootUsers.length) return <h2>Loading...</h2>;

  return (
    <div className="p-2 font-sans">
      <div className="rounded-md shadow-sm p-6 space-y-2">
        {rootUsers.map((user, i) => (
          <ReferralItem key={i} item={user} />
        ))}
      </div>
    </div>
  );
}

export default ReferralTree;

const ReferralItem = ({ item, level = 0 }: { item: any; level: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [children, setChildren] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const toggleExpand = async () => {
    if (!item.hasChildren) return; // ✅ do nothing if no children

    if (!isExpanded && children.length === 0) {
      // fetch children only the first time
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/refer-tree/children/${
            item.referralCode
          }`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setChildren(res.data.data.children);
      } catch (err) {
        console.log("Error fetching children", err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsExpanded(!isExpanded);
  };

  const paddingLeft = `${level * 1.5}rem`;

  return (
    <div className="text-gray-800">
      <div
        className={`flex items-center p-3 rounded-lg hover:bg-gray-100 ${
          item.hasChildren ? "cursor-pointer" : ""
        }`}
        style={{ paddingLeft }}
        onClick={item.hasChildren ? toggleExpand : undefined}
      >
        <div className="flex-shrink-0 w-6">
          {item.hasChildren ? (
            isExpanded ? (
              <ChevronDown size={16} className="text-gray-500" />
            ) : (
              <ChevronRight size={16} className="text-gray-500" />
            )
          ) : null}
        </div>
        <div className="flex-grow flex items-center space-x-4">
          <span className="font-medium text-lg">{item.username}</span>
          <span className="text-sm text-gray-500">({item.referralCode})</span>
        </div>
      </div>

      {isExpanded && (
        <div className="border-l-2 border-gray-300 ml-4">
          {isLoading ? (
            <p className="text-gray-500 ml-4">Loading...</p>
          ) : (
            children.map((child, i) => (
              <ReferralItem key={i} item={child} level={level + 1} />
            ))
          )}
        </div>
      )}
    </div>
  );
};
