import { SubstrateBlock } from "@subql/types";
import { Option } from '@polkadot/types';
import { Codec } from '@polkadot/types/types';
import { Moment, OracleValue } from '@parallel-finance/types/interfaces';

import { LiquidityValue } from "../types";
import { Balance } from "@polkadot/types/interfaces";

interface TimestampedValue extends Codec {
    value: OracleValue;
    timestamp: Moment;
}


export async function handleBlock(block: SubstrateBlock): Promise<void> {
    //Create a new starterEntity with ID using block hash
    // let record = new LiquidityValue(block.block.header.hash.toString());

    logger.info("api rpc: %o", api.rpc)

    // const re = await （api.rpc as any).oracle.getValue<Option<TimestampedValue>>('Aggregated', 100)
    const re = (await api.rpc as any).oracle.getValue('Aggregated', 100)
    logger.info(`price: ${re.toHuman()}`)
}
