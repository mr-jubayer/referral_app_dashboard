import { token } from "@/constant";
import axios from "axios";
import { useEffect } from "react";

function ReferralTree() {
  const [referralData, seReferralData] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const response = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/refer-tree`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      seReferralData(response.data.data.referTree);
    };

    getUsers();
  }, []);

  if (!referralData.length) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="p-2 font-sans">
      <div className=" rounded-md shadow-sm p-6">
        <div className="space-y-2">
          {referralData.map((item, index) => (
            <ReferralItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default ReferralTree;

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

// Recursive component to render each node and its children
const ReferralItem = ({ item, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Function to toggle the expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine padding for indentation based on the level
  const paddingLeft = `${level * 1.5}rem`;

  // Check if there are children to display the expand/collapse button
  const hasChildren = item.referralChildren && item.referralChildren.length > 0;

  return (
    <div className="text-gray-800">
      <div
        className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        style={{ paddingLeft }}
        onClick={hasChildren ? toggleExpand : undefined}
      >
        {hasChildren ? (
          <div className="flex-shrink-0 w-6">
            {isExpanded ? (
              <ChevronDown
                className="text-gray-500 transition-transform duration-200"
                size={16}
              />
            ) : (
              <ChevronRight
                className="text-gray-500 transition-transform duration-200"
                size={16}
              />
            )}
          </div>
        ) : (
          // Placeholder for indentation if no children exist
          <div className="flex-shrink-0 w-6"></div>
        )}
        <div className="flex-grow flex items-center space-x-4">
          <span className="font-medium text-lg">{item.username}</span>
          <span className="text-sm text-gray-500">({item.referralCode})</span>
        </div>
      </div>

      {/* Recursively render children if expanded and children exist */}
      {isExpanded && hasChildren && (
        <div className="border-l-2 border-gray-300 ml-4">
          {item.referralChildren.map((child, index) => (
            <ReferralItem key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
