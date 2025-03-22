import ProtectedLayout from "../layouts/ProtectedLayout";

export default function DashboardLayout({ children }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
