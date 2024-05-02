import { useState } from 'react';
import { BasicModal, Button } from '@interchain-ui/react';
import styled from '@emotion/styled';
import { useAppDispatch } from '@/redux/hooks';
import { assets } from 'chain-registry';
import { ChangeChainCombobox } from '@interchain-ui/react';
import { assetsListSlice } from '@/redux/assetsList/slice';

const symbols = ['ATOM', 'JUNO', 'STARS', 'BLD', 'STRD', 'CRO', 'AKT', 'MARS'];

const dropdownList = symbols.map((symbol) => {
  const asset = assets.find((assetList) => assetList.assets[0].symbol === symbol)!.assets[0];

  return {
    iconUrl: asset.logo_URIs?.png || asset.logo_URIs?.jpeg || asset.logo_URIs?.svg,
    label: asset.symbol,
    value: asset.name,
  };
});
export function Select() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState<{
    iconUrl?: string;
    label: string;
    value: string;
  } | null>(null);
  const dispatch = useAppDispatch();
  const addAsset = () => {
    // convert the dataType into assetListItemType
    const selectedItem = {
      isOtherChains: false,
      imgSrc: selectedChain?.iconUrl,
      symbol: selectedChain?.label,
      name: selectedChain?.value,
      tokenAmount: '89.66',
      tokenAmountPrice: '10'
    }
    dispatch(assetsListSlice.actions.addAssetItem(selectedItem))
    setIsOpen(false)
  }
  return (
    <BasicModal
      renderTrigger={(triggerProps) => (
        <BetweenContainer>
          <Button {...triggerProps} onClick={() => setIsOpen(true)}>
            Add An Asset
          </Button>
        </BetweenContainer>
      )}
      isOpen={isOpen}
      title='Select An Asset'
      onClose={() => setIsOpen(false)}
    >
      <Container>
        <ChangeChainCombobox
          size='md'
          valueItem={selectedChain ? selectedChain : undefined}
          appearance='bold'
          defaultSelected={undefined}
          onItemSelected={(item) => {
            console.log('Selected Item', item);
            setSelectedChain(item);
          }}
          options={dropdownList}
        />
        <BetweenContainer>
          <Button onClick={addAsset}>
            Add the asset
          </Button>
        </BetweenContainer>

      </Container>
    </BasicModal>
  );
}

const Container = styled.div`
width: 30vw;
height: 50vh;
`;

const BetweenContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 100%;
margin-bottom: 5vh;
margin-top: 5vh;
`
