import {
  Button,
  Card,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui";
import StatusBadge from "@/components/ui/StatusBadge.jsx";
import { FileText, Download, Calendar, Clock } from "lucide-react";

export default function ReservationsTable({ reservations, onOpenDetails }) {
  const handleDownloadInvoice = (r) => {
    alert(`Baixando fatura ${r.invoiceNumber}`);
  };

  return (
    <Card className="overflow-hidden shadow-none">
      <div className="overflow-x-auto">
        <Table className="[&_*]:border-gray-200">
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Espaço</TableHead>
              <TableHead>Data & Horário</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reservations.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-gray-500"
                >
                  Nenhuma reserva encontrada
                </TableCell>
              </TableRow>
            ) : (
              reservations.map((r) => (
                <TableRow key={r.id} className="hover:bg-gray-50">
                  <TableCell className="text-gray-900">{r.id}</TableCell>

                  <TableCell>
                    <p className="text-gray-900">{r.spaceName}</p>
                    <p className="text-sm text-gray-500">{r.spaceType}</p>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{r.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>
                          {r.startTime} - {r.endTime}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{r.duration}h</TableCell>

                  <TableCell>
                    <StatusBadge status={r.status} />
                  </TableCell>

                  <TableCell className="text-gray-700">
                    {r.paymentMethod}
                  </TableCell>

                  <TableCell className="text-gray-900">
                    R$ {r.total.toFixed(2)}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onOpenDetails(r)}
                      >
                        <FileText className="w-3 h-3 mr-1" /> Detalhes
                      </Button>

                      {r.status === "completed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadInvoice(r)}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
