import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { Button } from '@/components/ui/button';
import { useCreateRoom } from '@/http/use-create-room';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const createRoomFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
});

type CreateRoomFormSchema = z.infer<typeof createRoomFormSchema>;

export function CreateRoomForm() {
  const { mutateAsync: createRoom } = useCreateRoom();
  const createRoomForm = useForm<CreateRoomFormSchema>({
    resolver: zodResolver(createRoomFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  async function handleCreateRoom({ name, description }: CreateRoomFormSchema) {
    await createRoom({ name, description });
    createRoomForm.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar sala</CardTitle>
        <CardDescription>
          Crie uma sala para começar a fazer perguntas e receber respostas da
          I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createRoomForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
          >
            <FormField
              control={createRoomForm.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite o nome da sala" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={createRoomForm.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button className="w-full " type="submit">
              Criar sala
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
