import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRooms } from '@/http/use-rooms';
import { dayjs } from '@/lib/dayjs';
import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

export function RoomList() {
  const { data, isLoading } = useRooms();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas recentes</CardTitle>
        <CardDescription>
          Acesso rápidos parar as salas criadas recentemente
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <div className="flex items-center justify-center">
            Carregando...
            <Loader2 className="size-6 animate-spin" />
          </div>
        )}
        {data?.map((room) => {
          return (
            <Link
              className="flex items-center justify-between rounded-lg p-3 hover:bg-accent/50"
              key={room.id}
              to={`/room/${room.id}`}
            >
              <div className="flex flex-1 flex-col gap-1">
                <h3 className="font-medium">{room.name}</h3>

                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Badge className="text-xs" variant="secondary">
                    {room.questionsCount} pergunta(s)
                  </Badge>
                  <Badge className="text-xs" variant="secondary">
                    {dayjs(new Date(room.createdAt)).toNow()}
                  </Badge>
                </div>
              </div>
              <span className="flex items-center gap-1 text-sm">
                Entrar
                <ArrowRight className="size-3" />
              </span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
