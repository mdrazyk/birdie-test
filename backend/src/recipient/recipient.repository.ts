import { PrismaClient, Prisma } from "@prisma/client";
import { Chance } from "chance";

export const recipientRepositoryFactory = (database: PrismaClient) => {
  const chance = new Chance();

  return {
    getRecipients: async () => {
      const sql = Prisma.sql`SELECT DISTINCT care_recipient_id FROM events;`;

      const result = await database.$queryRaw<{ care_recipient_id: string }[]>(
        sql
      );

      return result.map(({ care_recipient_id }) => {
        return {
          recipientId: care_recipient_id,
          firstName: chance.first(),
          lastName: chance.last(),
        };
      });
    },

    getRecipientVisitDates: async (recipientId: string) => {
      const sql = Prisma.sql`
        SELECT DISTINCT DATE(timestamp) as date
        FROM events
        WHERE care_recipient_id = ${recipientId}
        GROUP BY DATE(timestamp)
        ORDER BY date ASC;
      `;

      const result = await database.$queryRaw<{ date: string }[]>(sql);

      return result.map(({ date }) => date);
    },

    getRecipientTimelineForDate: async ({
      recipientId,
      visitDate,
    }: {
      recipientId: string;
      visitDate: Date;
    }) => {
      const sql = Prisma.sql`
        SELECT
          MIN(e.id) as id,
          MIN(e.payload) as payload,
          FROM_UNIXTIME(UNIX_TIMESTAMP(e.timestamp)) as 'timestamp',
          MIN(e.visit_id) as visit_id,
          MIN(e.care_recipient_id) as care_recipient_id,
          MIN(e.caregiver_id) as caregiver_id,
          MIN(e.event_type) as event_type
        FROM events e 
        WHERE care_recipient_id = ${recipientId}
        AND DATE(timestamp) = ${visitDate}
        GROUP BY e.timestamp
        ORDER BY e.timestamp
      `;

      const result = await database.$queryRaw<
        {
          id: string;
          payload: string;
          timestamp: Date;
          visit_id: string;
          care_recipient_id: string;
          caregiver_id: string;
          event_type: string;
        }[]
      >(sql);

      return result;
    },
  };
};
