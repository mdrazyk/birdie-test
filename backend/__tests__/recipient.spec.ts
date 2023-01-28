import { appFactory } from "../src/application";
import * as request from "supertest";
import { dependencyInjectionContainerFactory } from "../src/dependencyInjectionContainer";

describe("recipientController.", () => {
  it("should return recipients when '/recipients/all' endpoint has been called", async () => {
    // given
    const data = [
      {
        recipientId: "111",
        firstName: "John",
        lastName: "Doe",
      },
      {
        recipientId: "222",
        firstName: "Jane",
        lastName: "Doe",
      },
    ];

    const dependencyInjectionContainerMock: ReturnType<
      typeof dependencyInjectionContainerFactory
    > = {
      recipientService: {
        getRecipients: jest.fn().mockResolvedValue(data),
        getRecipientVisitDates: jest.fn(),
        getRecipientTimelineForDate: jest.fn(),
      },
    };

    const app = appFactory(dependencyInjectionContainerMock);

    // when
    await request(app)
      .get("/recipients/all")
      // then
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(data);
      });
  });

  it("should return visit dates for recipient when '/recipients/:recipientId/visit-dates' endpoint has been called", async () => {
    // given
    const recipientId = "111";
    const visitDates = [
      "2019-04-23T00:00:00.000Z",
      "2019-04-24T00:00:00.000Z",
      "2019-04-25T00:00:00.000Z",
    ];

    const dependencyInjectionContainerMock: ReturnType<
      typeof dependencyInjectionContainerFactory
    > = {
      recipientService: {
        getRecipients: jest.fn(),
        getRecipientVisitDates: jest.fn().mockResolvedValue(visitDates),
        getRecipientTimelineForDate: jest.fn(),
      },
    };

    const app = appFactory(dependencyInjectionContainerMock);

    // when
    await request(app)
      .get(`/recipients/${recipientId}/visit-dates`)
      // then
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(visitDates);
      });
  });

  it("should return timeline for recipient on a specific date when '/recipients/:recipientId/timeline' endpoint has been called", async () => {
    // given
    const recipientId = "111";
    const visitDateString = "2019-04-23";
    const timelineForDate = [
      {
        id: "1",
        payload: {
          foo: "bar",
        },
        timestamp: "2019-04-23T00:00:00.000Z",
        visit_id: "11",
        care_recipient_id: "111",
        caregiver_id: "1111",
        event_type: "event_type_1",
      },
      {
        id: "2",
        payload: {
          foo: "bar",
        },
        timestamp: "2019-04-23T00:00:00.000Z",
        visit_id: "22",
        care_recipient_id: "222",
        caregiver_id: "2222",
        event_type: "event_type_2",
      },
    ];

    const dependencyInjectionContainerMock: ReturnType<
      typeof dependencyInjectionContainerFactory
    > = {
      recipientService: {
        getRecipients: jest.fn(),
        getRecipientVisitDates: jest.fn(),
        getRecipientTimelineForDate: jest
          .fn()
          .mockResolvedValue(timelineForDate),
      },
    };

    const app = appFactory(dependencyInjectionContainerMock);

    // when
    await request(app)
      .get(`/recipients/${recipientId}/timeline`)
      .query({ visitDateString })
      // then
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(timelineForDate);
      });
  });

  it("should throw validation error when '/recipients/:recipientId/timeline' endpoint has been called with query param", async () => {
    // given
    const recipientId = "111";
    const dependencyInjectionContainerMock: ReturnType<
      typeof dependencyInjectionContainerFactory
    > = {
      recipientService: {
        getRecipients: jest.fn(),
        getRecipientVisitDates: jest.fn(),
        getRecipientTimelineForDate: jest.fn(),
      },
    };

    const app = appFactory(dependencyInjectionContainerMock);

    // when
    await request(app)
      .get(`/recipients/${recipientId}/timeline`)
      .query({ invalidVisitDateString: null })
      // then
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({
          message: "visitDateString is a required field",
        });
      });
  });
});
