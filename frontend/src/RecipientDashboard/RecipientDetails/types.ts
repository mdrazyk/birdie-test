export type RecipientTimelineRecord = {
  id: string;
  care_recipient_id: string;
  caregiver_id: string | null;
  event_type: string;
  payload: Record<string, any>;
  timestamp: string;
  visit_id: string | null;
};