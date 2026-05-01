import AhtCsatChart from "./components/AhtCsatChart";
import ChannelIssueHeatmap from "./components/ChannelIssueHeatmap";
import ChannelScorecard from "./components/ChannelScorecard";
import DataQuality from "./components/DataQuality";
import Footer from "./components/Footer";
import HeadlineCallout from "./components/HeadlineCallout";
import Header from "./components/Header";
import IssueQuadrant from "./components/IssueQuadrant";
import KPICards from "./components/KPICards";
import MonthlyTrend from "./components/MonthlyTrend";

export default function Home() {
  return (
    <div className="min-h-screen pb-12">
      <Header />
      <HeadlineCallout />
      <KPICards />
      <ChannelScorecard />
      <ChannelIssueHeatmap />
      <MonthlyTrend />
      <AhtCsatChart />
      <IssueQuadrant />
      <DataQuality />
      <Footer />
    </div>
  );
}
