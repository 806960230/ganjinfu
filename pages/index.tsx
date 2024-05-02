import { AssetListItem, Box, Divider } from "@interchain-ui/react";
import { Layout, Wallet } from "@/components";
import { Deposit, Select } from "@/components/newFunc";
import { useDepositModal, useSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { DataSourceAdapter } from "@/utils/adapter";
import { config } from "@/config/dataSource";
export default function Home() {

  const [data, setData] = useState<any>(null);
  const { items } = useSelector(s => s.assetsList);
  const { open, depositOpen, close } = useDepositModal();

  const handleChange = () => {
    close();
  };
  useEffect(() => {

    const adapter = new DataSourceAdapter(config);

    // get data
    adapter.getData().then(async (data) => {
      console.log('look at the data', data)
      setData(data)
    }).catch((error) => {
      console.error('Opps! something mistakes：', error);
    }).finally(() => {
    });
  }, [])

  return (
    <Layout>
      <Wallet />
      <Divider mb="$16" />
      <Box overflowX={{ tablet: 'auto', mobile: 'scroll' }}>
        {
          items.map((item, index) => (
            <div key={index}>
              <AssetListItem
                isOtherChains={item.isOtherChains}
                imgSrc={item.imgSrc}
                symbol={item.symbol}
                name={item.name}
                tokenAmount='102.61'
                tokenAmountPrice='101.02'
                chainName={item.chainName}
                onDeposit={() => {
                  console.log('onDeposit');
                  open()
                }}
                onWithdraw={() => {
                  console.log('onWithdraw');
                }}
              />
            </div>

          ))
        }
      </Box>
      <Deposit depositOpen={depositOpen} onChange={handleChange} />
      <Select />
    </Layout>
  );
}
