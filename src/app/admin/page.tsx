import { AiOutlineLoading3Quarters as Loading } from "react-icons/ai";

export default async function AdminPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4">
      <Loading className="size-6 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        Select a restaurant from the sidebar to get started!
      </p>
    </div>
  );
}
