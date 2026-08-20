import LoginForm from "@/components/LoginForm";
import { getSiteConfig } from "@/lib/siteConfig";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const config = await getSiteConfig();
  return <LoginForm logoUrl={config.logoUrl} brandName={config.namaBrand} />;
}
