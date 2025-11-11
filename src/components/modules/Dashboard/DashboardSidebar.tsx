import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/user.interface";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { getDefaultDashboardRoute } from "@/lib/auth.utils";
import { NavSection } from "@/types/dashboard.interface";



const DashboardSidebar = async () => {
    const navItems : NavSection[] = [];
    const userInfo = (await getUserInfo()) as UserInfo;
    const dashboardHome = getDefaultDashboardRoute(userInfo.role);

    return <DashboardSidebarContent 
     userInfo={userInfo}
     navItems={navItems}
     dashboardHome={dashboardHome}
     />
};

export default DashboardSidebar;


