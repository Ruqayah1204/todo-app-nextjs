import TodoDetail from "@/components/TodoDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TaskDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  return <TodoDetail id={id} />;
}
