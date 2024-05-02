import { useState } from 'react';
import { assets } from 'chain-registry';
import { ChangeChainCombobox } from '@interchain-ui/react';

const symbols = ['ATOM', 'JUNO', 'STARS', 'BLD', 'STRD', 'CRO', 'AKT', 'MARS'];



const dropdownList = symbols.map((symbol) => {
    const asset = assets.find((assetList) => assetList.assets[0].symbol === symbol)!.assets[0];

    return {
        iconUrl: asset.logo_URIs?.png || asset.logo_URIs?.jpeg || asset.logo_URIs?.svg,
        label: asset.symbol,
        value: asset.name,
    };
});

export function Combobox() {
    const [selectedChain, setSelectedChain] = useState<{
        iconUrl?: string;
        label: string;
        value: string;
    } | null>(null);

    return (
        <ChangeChainCombobox
            size='md'
            valueItem={selectedChain ? selectedChain : undefined}
            appearance='bold'
            onItemSelected={(item) => {
                console.log('Selected Item', item);
                setSelectedChain(item);
            }}
            options={dropdownList}
        />
    );
}
