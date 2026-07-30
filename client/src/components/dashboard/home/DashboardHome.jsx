import AIInsights from "@/components/dashboard/home/AIInsights";
import QuickActions from "@/components/dashboard/home/QuickActions";
import RecentMeetings from "@/components/dashboard/home/RecentMeetings";
import StatsCards from "@/components/dashboard/home/StatsCards";
import WelcomeHeader from "@/components/dashboard/home/WelcomeHeader";

export default function DashboardHome() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <WelcomeHeader />
      <StatsCards />
      <QuickActions />

      <div className="grid gap-8 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <RecentMeetings />
        </div>
        <div className="xl:col-span-2">
          <AIInsights />
        </div>
      </div>
    </div>
  );
}
