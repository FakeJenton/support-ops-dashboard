import dashboard from "./dashboard.json";

export type Channel = "phone" | "email" | "social" | "chat";
export type IssueType =
  | "account"
  | "delivery"
  | "login"
  | "other"
  | "payment"
  | "refund";
export type CustomerType = "broker" | "client" | "fan";

export interface ChannelStats {
  channel: Channel;
  tickets: number;
  volume_pct: number;
  csat: number;
  aht: number;
  reopen: number;
  escalation: number;
  frt: number;
  total_min: number;
  cost_pct: number;
}

export interface IssueStats {
  issue_type: IssueType;
  tickets: number;
  csat: number;
  aht: number;
  reopen: number;
  escalation: number;
}

export interface CustomerStats {
  customer_type: CustomerType;
  tickets: number;
  csat: number;
  aht: number;
  reopen: number;
  escalation: number;
}

export interface MonthStats {
  month: string;
  month_label: string;
  tickets: number;
  csat: number;
  aht: number;
  reopen: number;
  escalation: number;
}

export interface AhtBin {
  bin: string;
  tickets: number;
  csat: number;
}

export interface HeatmapCell {
  channel: Channel;
  issue_type: IssueType;
  tickets: number;
  csat: number;
  aht: number;
  reopen: number;
}

export interface NegativeCsatChannel {
  channel: Channel;
  count: number;
  pct_of_negative: number;
}

export interface DashboardData {
  overview: {
    total_tickets: number;
    total_handle_minutes: number;
    overall_csat: number;
    overall_aht: number;
    overall_reopen: number;
    overall_escalation: number;
    overall_frt: number;
    date_range: { start: string; end: string };
  };
  by_channel: ChannelStats[];
  by_issue_type: IssueStats[];
  by_customer_type: CustomerStats[];
  by_month: MonthStats[];
  aht_bins: AhtBin[];
  channel_issue_heatmap: HeatmapCell[];
  negative_csat_by_channel: NegativeCsatChannel[];
}

export const data = dashboard as DashboardData;

export const CHANNEL_ORDER: Channel[] = ["phone", "email", "social", "chat"];
export const ISSUE_ORDER: IssueType[] = [
  "account",
  "payment",
  "login",
  "delivery",
  "refund",
  "other",
];

export const CHANNEL_LABEL: Record<Channel, string> = {
  phone: "Phone",
  email: "Email",
  social: "Social",
  chat: "Chat",
};

export const ISSUE_LABEL: Record<IssueType, string> = {
  account: "Account",
  delivery: "Delivery",
  login: "Login",
  other: "Other",
  payment: "Payment",
  refund: "Refund",
};

export const COLORS = {
  navy: "#1F3A5F",
  navyLight: "#3B5B85",
  red: "#C0392B",
  redLight: "#E74C3C",
  green: "#1E8449",
  greenLight: "#27AE60",
  amber: "#D68910",
  amberLight: "#E59866",
  gray: "#6B7280",
  grayLight: "#D1D5DB",
  bg: "#F8FAFC",
  cardBorder: "#E5E7EB",
};

export const CHANNEL_COLOR: Record<Channel, string> = {
  phone: COLORS.green,
  email: COLORS.navyLight,
  social: COLORS.gray,
  chat: COLORS.red,
};
