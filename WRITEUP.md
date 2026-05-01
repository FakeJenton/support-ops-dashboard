# Q1 2026 Support Operations Analysis

**Live dashboard:** https://support-ops-dashboard.vercel.app/

This analysis covers 16,000 customer support tickets handled across four channels (phone, email, social, chat) between January 1 and March 31, 2026. The dashboard renders the figures section by section. This document explains what the figures mean, what to do about them, and what the dataset cannot tell us.

## The bottom line

Chat is the structural problem in support operations.

Chat carries 43% of ticket volume but generates 50% of total operational cost (measured in agent-handle minutes), 60% of all negative-CSAT tickets, and 100% of reopened tickets in the dataset. Fixing chat is the single largest operational lever available this quarter, and it is the lens through which every other finding in the dashboard becomes legible.

## Key findings

### 1. The channel gap is structural, not seasonal

Phone clears 87.4% CSAT at 9.2 minutes per ticket. Chat clears 53.1% CSAT at 15.0 minutes. Same period, same agent pool, same customer base. The 34-point CSAT gap and 5.8-minute handle-time premium are not explained by ticket-mix differences (chat handles roughly the same issue distribution as the other channels). The gap sits in the chat workflow itself.

The dashboard's channel scorecard (Section 01) shows this across all four metrics simultaneously: CSAT, AHT, reopen rate, volume share. The heatmap (Section 02) reinforces the finding: phone clears 85%+ on every issue type, while chat sits below 60% on every issue type. The channel choice dominates the issue type entirely.

### 2. The "Q1 decline" narrative is a channel-mix artifact

Aggregate CSAT moved 1.4 points across the entire quarter (65.6% in January, 67.0% in March). Volume held essentially flat (5,538 / 4,987 / 5,475 tickets per month). Average handle time moved 0.16 minutes.

There is no Q1 decline to explain. Months that look worse in aggregate are simply months with heavier chat mix. This matters because it eliminates a class of explanations (seasonality, agent fatigue, system regressions) that leadership might otherwise pursue. The dashboard's counter-narrative section (03) makes this visible by tracing all three KPIs flat across Jan, Feb, and Mar.

### 3. Long tickets are bad tickets, but greeting speed is not the issue

CSAT collapses 22 points as handle time grows from sub-5 minutes (74% CSAT) to over 25 minutes (52% CSAT). Chat sits at 15-minute AHT, in the collapse zone. Phone sits at 9 minutes, in the high-CSAT zone.

Critically, first-response time shows no relationship to CSAT (65-69% across all FRT buckets). The bottleneck is resolution quality, not greeting speed. Optimizing time-to-first-response, a common SLA target, is unlikely to move the needle. Optimizing time-to-resolution will. The dashboard's Section 04 shows the bin-by-bin CSAT collapse.

### 4. Issue type splits into two distinct failure modes

The issue-type scatter (Section 05) reveals two clusters:

**Complexity issues (account, payment).** Escalation rates of 10.2% and 10.8%, roughly 2x baseline. These are problems that require tier-2 expertise, but they're filing through first-touch chat first. Account and payment together are 33% of volume but generate 48% of all escalations.

**Wait-state issues (delivery, refund).** Reopen rates of 19-20%, vs 15% baseline. These are problems whose resolution depends on external events the agent cannot trigger in-session (a refund clearing, a package arriving). Synchronous chat is the wrong channel for them.

The two failure modes need different operational fixes (see recommendations 2 and 4 below).

### 5. Customer type does not drive performance

Fan, broker, and client are statistically indistinguishable on CSAT, AHT, and escalation rate. The only meaningful difference is reopen rate (broker +2pp vs fan, p = 0.009), and that difference concentrates in chat delivery and refund tickets, where reopens are already the dominant problem. Customer segmentation does not unlock new operational levers.

## Recommendations

The dashboard pairs each recommendation with the finding it solves. Ranked by leverage:

1. **Re-architect chat closure to fix reopens.** Add a "did this fully resolve your issue?" confirmation step before close. Route any reopened ticket to the original agent or a senior agent rather than back into the queue. Targets the 39.7% chat reopen rate.

2. **Deflect wait-state issues to async channels.** Build an in-app refund tracker and a delivery-status flow so customers don't open synchronous chat tickets that depend on external events. Conservatively, deflecting 30% of chat volume saves roughly 510 agent-hours per quarter.

3. **Deploy AI-assisted resolution in the chat agent console.** Embed reply-drafting and customer-context retrieval (order status, refund eligibility, prior tickets) directly in the workflow. Targets the 5.8-minute AHT gap between chat and phone.

4. **Route account and payment directly to tier 2.** Add an intent-classification step at intake, bypass first-touch chat for these two categories. One workflow change addresses nearly half of all escalations.

5. **Instrument agent_id, team, and tenure on every ticket.** Capture reopens uniformly across channels, not just chat. This unlocks the next layer of analysis (individual variance, training cohorts, tenure curves) and is a prerequisite for any agent-level operational decision.

## Data quality notes

Two gaps cap further analysis with this dataset:

- **No agent identifier.** Some of what looks like channel variance may be operator variance. We cannot separate them. This means the analysis above cannot rule out the possibility that chat is staffed by less experienced agents and that the channel itself is fine. Operationally, the distinction matters.

- **Reopens captured only on chat.** Phone, email, and social all show 0% reopen, which is almost certainly an instrumentation gap rather than perfect resolution. Cross-channel reopen comparisons are not possible until reopens are logged uniformly.

A third item worth flagging: first-response time shows no CSAT relationship across any bucket, which is unusual. The operational definition of FRT in this dataset is worth confirming against the SLA being measured.

## Closing

Chat is the structural problem this quarter. The fix is not a single intervention but four parallel operational moves (recommendations 1 through 4) plus an instrumentation prerequisite (recommendation 5). The recommendations should be evaluated together: routing complexity issues to tier 2 (#4) without fixing chat closure (#1) will reduce escalations but leave reopens intact. Building async deflection (#2) without AI-assisted resolution (#3) will move volume off chat but leave the chat tickets that remain just as long and just as poor.

The dataset cannot tell us whether the gap is workflow, agent skill, or both. Recommendation 5 is the path to that answer. Until it lands, recommendations 1 through 4 should be treated as the highest-leverage moves that the current data unambiguously supports.
