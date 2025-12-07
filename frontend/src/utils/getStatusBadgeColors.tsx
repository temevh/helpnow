export default function getStatusBadgeColor(status: string | undefined) {
  switch (status) {
    case "OPEN":
      return "green";
    case "ACCEPTED":
      return "yellow";
    case "COMPLETED":
      return "blue";
    case "CLOSED":
      return "red";
    case "FILLED":
      return "orange";
    default:
      return "gray";
  }
}
