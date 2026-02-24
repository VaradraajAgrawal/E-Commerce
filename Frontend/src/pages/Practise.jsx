import { useState } from "react";

const Practise = () => {
  const [value, setValue] = useState(null);
  const [confirmed, setConfirmed] = useState([]);
  const [booking, setBooking] = useState([]);
  const Request_Status = {
    PENDING: "pending",
    CANCELED: "canceled",
    EXPIRED: "expired",
  };

  const CONFIRMATION_STATUS = {
    CONFIRMED: "confirmed",
    CANCELED: "canceled",
  };

  const bookingRequest = () => {
    const data = {
      requestId: "p2",
      userId: "u34",
      resourceId: "r14",
      startTime: Date.now(),
      endTime: Date.now() + 1000,
    };

    setValue({
      requestId: data.requestId,
      userId: data.userId,
      resourceId: data.resourceId,
      startTime: data.startTime,
      status: Request_Status.PENDING,
      endTime: Date.now() + 1000,
    });
  };
  const confirmation = (request) => {
    const exists = confirmed.find((item) => item.userId === request.userId);
    if (!request) {
      console.log("No Request Made!!");
      return;
    }
    if (exists) {
      console.log("Booking Already Done");
      return;
    }

    if (request.status !== Request_Status.PENDING) {
      console.log("Request already resolved!!");
      return;
    }
    setValue(null);
    setConfirmed((prev) => [...prev, request]);
    return {
      ...request,
      status: CONFIRMATION_STATUS.CONFIRMED,
    };
  };
  const Bookingcanceled = (request) => {
    if (!request) {
      console.log("No Request Made!!");
      return;
    }

    if (request.status !== Request_Status.PENDING) {
      console.log("Already resolved!!");
      return;
    }

    setValue(null);
    return {
      ...request,
      status: CONFIRMATION_STATUS.CANCELED,
    };
  };

  const confirmedCancel = (id) => {
    if (confirmed.length <= 0) {
      console.log("No Bookings Confirmed Yet!!");
      return;
    }
    let changed = confirmed.find((item) => item.userId === id);
    changed.status = CONFIRMATION_STATUS.CANCELED;
    const filtered = confirmed.filter((item) => item.userId !== id);
    setConfirmed(filtered);
  };

  //   const isSlotAvailable = (request) => {
  //     return !booking.some(
  //       (item) =>
  //         item.userId === request.userId &&
  //         !(
  //           item.endTime <= request.startTime || item.startTime >= request.endTime
  //         )
  //     );
  //   };

  const confirmBooking = (request) => {
    const conflict = booking.some(
      (item) =>
        item.resourceId === request.resourceId &&
        !(
          item.endTime <= request.startTime || request.endTime <= item.startTime
        )
    );

    if (conflict) {
      throw new Error("Conflict Occured!!");
    }

    booking.push(request);
    return console.log("CONFIRMED!!");
  };

  const reqA = {
    userId: "u1",
    resourceId: "room1",
    startTime: 10,
    endTime: 11,
  };

  const reqB = {
    userId: "u2",
    resourceId: "room1",
    startTime: 10,
    endTime: 11,
  };

  // simulate near-simultaneous execution
  try {
    confirmBooking(reqA);
    confirmBooking(reqB);
  } catch (e) {
    console.log(e.message);
  }

  console.log(booking);

  return (
    <div className="p-10 min-w-screen text-black max-h-screen">
      <h1 className="absolute top-[150px]">Hello</h1>
      <button
        onClick={() => bookingRequest()}
        className="text-white text-2xl absolute top-[250px]"
      >
        Click Me!!
      </button>

      <button
        onClick={() => console.log(confirmation(value))}
        className="text-white text-2xl absolute top-[350px]"
      >
        Click Confirm!!
      </button>
      <button
        // 1. Correct the function call to pass an OBJECT
        onClick={() => console.log(Bookingcanceled(value))}
        className="text-white text-2xl absolute top-[350px] left-[200px]"
      >
        Click cancel!!
      </button>
      <button
        onClick={() => console.log(confirmedCancel("u34"))}
        className="text-white text-2xl absolute top-[450px]"
      >
        Click Confirm cancel!!
      </button>
    </div>
  );
};

export default Practise;
