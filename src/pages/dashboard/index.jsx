import { CardProperty, Hero, SectionHeading } from "@/components";

export default function Dashboard() {
  return (
    <main>
      <Hero />
      <div className="py-32">
        <div className="container">
          <SectionHeading>Dashboard</SectionHeading>

          <div className="overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {[
                    "Purchase Code",
                    "Package Name",
                    "Purchase Date",
                    "Total Amount",
                    "Payment Status",
                    "Usage Status",
                    "Voucher ",
                  ].map((heading, index) => (
                    <th
                      className="px-4 4xl:px-10 py-6 4xl:py-12 font-normal whitespace-nowrap text-white bg-primary"
                      key={`table-heading-${index}`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((item, index) => (
                  <tr className="bg-gray-300 even:bg-gray-100">
                    {[...Array(7)].map((item, index) => (
                      <td
                        className="px-4 py-2 4xl:py-8"
                        key={`table-body-${index}`}
                      >
                        Sample text
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
