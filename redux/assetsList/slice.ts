import { AssetListItemProps } from '@interchain-ui/react';
import { createSlice } from '@reduxjs/toolkit'
import { assets } from 'chain-registry';

export interface AssetItem extends AssetListItemProps {
    isOtherChains: boolean,
    imgSrc: string,
    symbol: string,
    name: string,
    tokenAmount: string,
    tokenAmountPrice: string,
}

const symbols = ['ATOM', 'JUNO', 'STARS'];

const List = symbols.map((symbol) => {
    const asset = assets.find((assetList) => assetList.assets[0].symbol === symbol)!.assets[0];

    return {
        isOtherChains: false,
        imgSrc: asset.logo_URIs?.png || asset.logo_URIs?.jpeg || asset.logo_URIs?.svg || '',
        symbol: asset.symbol,
        name: asset.name,
        tokenAmount: '89.66',
        tokenAmountPrice: '10'
    }
});


interface assetsListState {
    items: AssetItem[],
    item: AssetItem
}

const initialState: assetsListState = {
    items: List,
    item: List[0]
}


export const assetsListSlice = createSlice({
    name: "assetsList",
    initialState,
    reducers: {
        addAssetItem(state, { payload }) {
            state.items.push(payload)
        },
    }
})

