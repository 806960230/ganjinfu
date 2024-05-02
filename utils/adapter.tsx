import { chains, ibc, assets } from 'chain-registry';
import { ChainRegistryClient } from '@chain-registry/client';

export interface SearchType {
    type: 'chain' | 'asset' | 'ibc',
    chainName: string,
    ibc?: { chain_name_1: string, chain_name_2: string }
}

interface DataSourceProvider {
    getData(searchType: SearchType): Promise<any>;
}

export type Query = {
    chainNames: string[]
} | null

//
class ChainRegistryClientDataSource implements DataSourceProvider {
    private client: ChainRegistryClient;

    constructor(searchType: SearchType, query: Query) {
        if(!query) {
            throw new Error('please set the chainName you want to query')
        }
        this.client = new ChainRegistryClient(query);
        this.getData(searchType);
    }

    async getData(searchType: SearchType): Promise<any> {
        // chain info, assets and ibc data will be downloaded dynamically by invoking fetchUrls method
        await this.client.fetchUrls();
        switch (searchType.type) {
            case 'chain':
                // get chain data
                return await this.client.getChain(searchType.chainName);
            case 'asset':
                // get asset list
                return await this.client.getChainAssetList(searchType.chainName);
            case 'ibc':
                // get asset list (including ibc assets)
                return await this.client.getGeneratedAssetLists(searchType.chainName);
            default:
                throw new Error('no supporting this type of data')
        }
    }
}

class ChainRegistryDataSource implements DataSourceProvider {

    constructor(searchType: SearchType) {
        this.getData(searchType)
    }


    async getData(searchType: SearchType): Promise<any> {

        switch (searchType.type) {
            case 'chain':
                // get chain data
                return chains.find(({ chain_name }) => chain_name === searchType.chainName);
            case 'asset':
                // get asset list
                return assets.find(({ chain_name }) => chain_name === searchType.chainName);
            case 'ibc':
                // get ibc assets
                return ibc.find((item) => {
                    if (item.chain_1.chain_name === searchType.ibc?.chain_name_1 && item.chain_2.chain_name === searchType.ibc?.chain_name_2) return true;
                });
            default:
                throw new Error('no supporting this type of data')
        }
    }
}

export class DataSourceAdapter {
    private dataSource: DataSourceProvider;
    private searchType: SearchType;
    constructor(config: { dataSourceType: 'chain-registry' | '@chain-registry/client', query: Query, searchType: SearchType }) {
        this.searchType = config.searchType;
        if (config.dataSourceType === 'chain-registry') {
            this.dataSource = new ChainRegistryDataSource(config.searchType);    
        } else if (config.dataSourceType === '@chain-registry/client') {
            this.dataSource = new ChainRegistryClientDataSource(config.searchType, config.query);
        } else {
            throw new Error('no supporting this kind of data source');
        }
    }

    async getData(): Promise<any> {
        return await this.dataSource.getData(this.searchType);
    }
}
