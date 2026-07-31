import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {

  const stats = [
    { title: "Products", value: "248" },
    { title: "Categories", value: "18" },
    { title: "Low Stock", value: "12" },
    { title: "Suppliers", value: "36" },
  ];

  return (

    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back to StockFlow.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((card) => (

          <Card key={card.title}>

            <CardHeader>

              <CardTitle className="text-sm text-gray-500">
                {card.title}
              </CardTitle>

            </CardHeader>

            <CardContent>

              <p className="text-4xl font-bold">
                {card.value}
              </p>

            </CardContent>

          </Card>

        ))}

      </div>

    </div>

  );
}
