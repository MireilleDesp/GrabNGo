import RatioList from "../../Components/RatioList/RatioList";

type Props = {};


const tableConfig = [
  {
    label: "batata",
    render: (company: any) => company.symbol,
  },
];

const DesignPage = (props: Props) => {
  return (
    <>
      <h1>Grab & Go Design Page</h1>
      <h2>This page is where we house our different application designs.</h2>
      {/* <RatioList config={tableConfig} data={data} /> */}
      {/* <Table config={tableConfig} data={data} /> */}
      <h3>
        Table - Table takes in a configuration object and company data as
        params. Use the config to style your table.
      </h3>
    </>
  );
};

export default DesignPage;
