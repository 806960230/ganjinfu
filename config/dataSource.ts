import { Query, SearchType } from "@/utils/adapter"

type Config<DataSourceType extends '@chain-registry/client' | 'chain-registry'> = {
    dataSourceType: DataSourceType,
    query?: Query,
    searchType: SearchType
} & (DataSourceType extends '@chain-registry/client' ? { query: Query } : { query: null });

/* In this definition, we use the generic parameter DataSourceType to represent the data source type, 
and then check in the conditional type whether it equals '@chain-registry/client'. 
If it does, then the query property must exist; 
otherwise, the query property is null. */

/* please note that in the 'searchType' Object, the 'type' property's value should be the one of three values('asset', 'ibc', 'chain')  */

export const config: Config<'chain-registry'> = {
    dataSourceType: 'chain-registry',
    query: null,
    searchType: { type: 'asset', chainName: 'osmosis' }

}

// if you want to find some multiple dataSource, here are some examples which set the config correctly.

/*  


example 1: (when you change the dataSourceType into 'chain-registry', please note that the query property must be null, you must input 2 values into the Object called 'ibc')

export const config: Config<'chain-registry'> = {
    dataSourceType: 'chain-registry',
    query: null,
    searchType: {type: 'ibc', chainName: '', ibc: { chain_name_1: '8ball' , chain_name_2: 'osmosis'}}
}

example 2: (when you change the dataSourceType into '@chain-registry/client', please note that query must have values )

export const config: Config<'@chain-registry/client'> = {
    dataSourceType: '@chain-registry/client',
    query: {
        chainNames: ['osmosis', 'juno', 'stargaze']
    },
    searchType: {type: 'asset', chainName: 'osmosis'}

}

example 3:

export const config: Config<'@chain-registry/client'> = {
    dataSourceType: '@chain-registry/client',
    query: {
        chainNames: ['osmosis', 'juno', 'stargaze']
    },
    searchType: {type: 'chain', chainName: 'osmosis'}
}

example 4:

export const config: Config<'@chain-registry/client'> = {
    dataSourceType: '@chain-registry/client',
    query: {
        chainNames: ['osmosis', 'juno', 'stargaze']
    },
    searchType: {type: 'ibc', chainName: 'osmosis'}
}

example 5:

export const config: Config<'chain-registry'> = {
    dataSourceType: 'chain-registry',
    query: null,
    searchType: {type: 'asset', chainName: 'osmosis'}

}

example 6:

export const config: Config<'chain-registry'> = {
    dataSourceType: 'chain-registry',
    query: null,
    searchType: {type: 'chain', chainName: 'osmosis'}
}

*/