import { AssetWithdrawTokens, Box, BasicModal, Button } from '@interchain-ui/react';
import styled from '@emotion/styled';

interface DepositProps {
    depositOpen: boolean,
    onChange: () => void;
}

export function Deposit(props: DepositProps) {

    return (
        <BasicModal
            isOpen={props.depositOpen}
            title='Select An Asset'
            onClose={() => props.onChange()}
        >
            <Container>
                <Box display='flex' justifyContent='center'>
                    <AssetWithdrawTokens
                        fromSymbol='ATOM'
                        fromName='Cosmos Hub'
                        fromAddress='cosmos1lqsq8hx42l7dzwd7nu8hx42lpkl9zev48trj5k'
                        fromImgSrc='https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png'
                        toName='Osmosis'
                        toAddress='osmo1lqsq8hx42l7dzwd7nu8hx42lpkl9zev48trj5k'
                        toImgSrc='https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg'
                        available={25.89}
                        amount=''
                        priceDisplayAmount={0.5}
                        timeEstimateLabel='20 seconds'
                        onChange={(value) => {
                            console.log('onChange', value);
                        }}
                        onTransfer={() => {
                            console.log('onTransfer');
                        }}
                        onCancel={() => {
                            props.onChange()
                        }}
                        onAddressChange={(value: string) => {
                            console.log('onAddressChange', value);
                        }}
                        onAddressConfirm={() => {
                            console.log('onAddressConfirm');
                        }}
                    />
                </Box>
            </Container>
        </BasicModal>
    );
}

const Container = styled.div`
width: 30vw;
height: 50vh;
`;
