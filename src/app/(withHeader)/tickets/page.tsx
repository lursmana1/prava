import BaseApi from "@/api/BaseApi";

type TicketsPageProps = {
  params: { ticketId?: string }; // adjust to your route
};

export default async function TicketsPage({ params }: TicketsPageProps) {
  const parameters = await params;
  const ticketId = parameters?.ticketId;

  const questions = await BaseApi.get("/questions", {
    params: {
      subjects: ticketId ?? "", // or whatever logic you want
      random: 30,
      categories: 1,
    },
  }).then((r) => r.data);

  console.log(questions);

  return (
    <div>
      <div className="section">
        <h1>ბილეთებზე ვარჯიში</h1>
      </div>
    </div>
  );
}
