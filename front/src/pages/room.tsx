import { Link, Navigate, useParams } from 'react-router-dom';

type RoomParams = {
  roomId: string;
};

export function Room() {
  const params = useParams<RoomParams>();

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div>
      <h1 className="font-bold text-3xl">Room details {params.roomId}</h1>
      <Link className="underline" to="/">
        Back to home
      </Link>
    </div>
  );
}
