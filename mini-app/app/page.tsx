import { title, description } from "@/lib/metadata";
import RiskEstimatorForm from "@/components/risk-estimator-form";

export default function Home() {
  return (
    <main className="flex flex-col gap-3 place-items-center place-content-center px-4 grow">
      <h1 className="text-2xl">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <RiskEstimatorForm />
    </main>
  );
}
