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
                      className="px-4 py-2 xl:py-4 font-normal whitespace-nowrap text-left text-white bg-primary"
                      key={`table-heading-${index}`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((item, index) => (
                  <tr
                    className="bg-gray-300 even:bg-gray-100"
                    key={`row-${index}`}
                  >
                    {[...Array(7)].map((item, index) => (
                      <td className="px-4 py-2 xl:py-4" key={`col-${index}`}>
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
