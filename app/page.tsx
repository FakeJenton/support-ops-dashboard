import AhtCsatChart from "./components/AhtCsatChart";
import ChannelIssueHeatmap from "./components/ChannelIssueHeatmap";
import ChannelScorecard from "./components/ChannelScorecard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import IssueQuadrant from "./components/IssueQuadrant";
import KPICards from "./components/KPICards";
import MonthlyTrend from "./components/MonthlyTrend";
import Recommendations from "./components/Recommendations";

export default function Home() {
  return (
    <div className="min-h-screen pb-12">
      <Header />
      <KPICards />
      <ChannelScorecard />
      <MonthlyTrend />
      <AhtCsatChart />
      <IssueQuadrant />
      <ChannelIssueHeatmap />
      <Recommendations />
      <Footer />
    </div>
  );
}
