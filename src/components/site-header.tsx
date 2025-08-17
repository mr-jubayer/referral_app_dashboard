import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { navList } from "@/constant";
import { LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export function SiteHeader() {
  const location = useLocation();
  const [title, setTitle] = useState("Overview");
  const navigate = useNavigate();

  useEffect(() => {
    navList.forEach((item) => {
      if (item.url == location.pathname) {
        setTitle(item.title);
      }
    });
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            className="text-black font-bold  hover:bg-transparent h-8 w-8 rounded-full  cursor-pointer"
            onClick={handleLogout}
          >
            <LogOutIcon className="text-black" />
          </Button>
        </div>
      </div>
    </header>
  );
}
