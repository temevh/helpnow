import { colors } from "@/theme";

export default function getStatusColor(status: string) {
  switch (status) {
    case "OPEN":
      return colors.status.open;
    case "ACCEPTED":
      return colors.status.accepted;
    case "COMPLETED":
      return colors.status.completed;
    case "CLOSED":
      return colors.status.closed;
    case "FILLED":
      return colors.status.filled;
    default:
      return colors.status.default;
  }
}
