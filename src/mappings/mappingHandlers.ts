import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
import { Option } from '@polkadot/types';
import { Codec } from '@polkadot/types/types';
import { Moment, OracleValue } from '@parallel-finance/types/interfaces';

import {StarterEntity} from "../types";
import {Balance} from "@polkadot/types/interfaces";

interface TimestampedValue extends Codec {
    value: OracleValue;
    timestamp: Moment;
  }


export async function handleBlock(block: SubstrateBlock): Promise<void> {
    //Create a new starterEntity with ID using block hash
    let record = new StarterEntity(block.block.header.hash.toString());
    //Record block number
    record.field1 = block.block.header.number.toNumber();
    logger.info("api rpc: %o", api.rpc)

    // const re = await （api.rpc as any).oracle.getValue<Option<TimestampedValue>>('Aggregated', 100)
    const re = (await api.rpc as any).oracle.getValue('Aggregated', 100)
    logger.info(`price: ${re.toHuman()}`)
    await record.save();
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;
    //Retrieve the record by its ID
    const record = await StarterEntity.get(event.block.block.header.hash.toString());
    record.field2 = account.toString();
    //Big integer type Balance of a transfer event
    record.field3 = (balance as Balance).toBigInt();
    await record.save();
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = await StarterEntity.get(extrinsic.block.block.header.hash.toString());
    //Date type timestamp
    record.field4 = extrinsic.block.timestamp;
    //Boolean tyep
    record.field5 = true;
    await record.save();
}


