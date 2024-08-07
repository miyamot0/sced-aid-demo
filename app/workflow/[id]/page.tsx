import WorkflowPage from "@/components/pages/workflow/workflow";

type Props = { params: { id: string } };

export default function Page({ params }: Props) {
  const { id } = params;

  return <WorkflowPage id={id} />;
}
