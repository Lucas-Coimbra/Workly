import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/Textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Send } from "lucide-react";

export default function NewTicketDialog({ onSubmit, trigger }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title || !category || !priority || !description) return;

    onSubmit({
      title,
      category,
      priority,
      description,
    });

    setTitle("");
    setCategory("");
    setPriority("");
    setDescription("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className="max-w-2xl bg-white border border-gray-200
          shadow-xl rounded-2xl"
      >
        <DialogHeader>
          <DialogTitle>Abrir Novo Chamado</DialogTitle>
          <DialogDescription>
            Descreva seu problema ou dúvida e nossa equipe responderá em breve
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Título do Chamado</Label>
            <Input
              placeholder="Ex: Problema com reserva"
              className="mt-2 bg-gray-100 border-gray-300 focus:bg-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Categoria</Label>
              <Select onValueChange={setCategory}>
                <SelectTrigger className="mt-2 bg-gray-100 border-gray-300 focus:bg-white">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Técnico</SelectItem>
                  <SelectItem value="billing">Financeiro</SelectItem>
                  <SelectItem value="reservation">Reservas</SelectItem>
                  <SelectItem value="space">Espaços</SelectItem>
                  <SelectItem value="general">Geral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Prioridade</Label>
              <Select onValueChange={setPriority}>
                <SelectTrigger className="mt-2 bg-gray-100 border-gray-300 focus:bg-white">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Alta (urgente)</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Descrição</Label>
            <Textarea
              placeholder="Descreva com detalhes o que está acontecendo..."
              className="mt-2 min-h-[150px] bg-gray-100 border-gray-300 focus:bg-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar Chamado
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
