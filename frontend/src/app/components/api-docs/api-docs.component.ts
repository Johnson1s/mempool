import { Component, OnInit } from '@angular/core';
import { Env, StateService } from 'src/app/services/state.service';
import { Observable, merge, of } from 'rxjs';
import { SeoService } from 'src/app/services/seo.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-api-docs',
  templateUrl: './api-docs.component.html',
  styleUrls: ['./api-docs.component.scss']
})
export class ApiDocsComponent implements OnInit {
  hostname = document.location.hostname;
  network$: Observable<string>;
  active = 0;
  env: Env;
  code: any;
  baseNetworkUrl = '';

  constructor(
    private stateService: StateService,
    private seoService: SeoService,
  ) { }

  ngOnInit(): void {
    this.env = this.stateService.env;
    this.seoService.setTitle($localize`:@@e351b40b3869a5c7d19c3d4918cb1ac7aaab95c4:API`);
    this.network$ = merge(of(''), this.stateService.networkChanged$).pipe(
      tap((network: string) => {
        if (this.env.BASE_MODULE === 'mempool' && network !== '') {
          this.baseNetworkUrl = `/${network}`;
        }
        return network;
      })
    );

    if (document.location.port !== '') {
      this.hostname = `${this.hostname}:${document.location.port}`;
    }

    this.hostname = `${document.location.protocol}//${this.hostname}`;

    if (document.location.hostname === 'localhost') {
      if (this.env.BASE_MODULE === 'bisq') {
        this.hostname = `https://bisq.markets`;
      }
      if (this.env.BASE_MODULE === 'liquid') {
        this.hostname = `https://liquid.network`;
      }
      if (this.env.BASE_MODULE === 'mempool') {
        this.hostname = `https://mempool.space`;
      }
    }

    this.code = {
      address: {
        codeTemplate: {
          curl: `/api/address/%{1}`,
          commonJS: `
        const { %{0}: { addresses } } = mempoolJS();

        const address = '%{1}';
        const myAddress = await addresses.getAddress({ address });

        document.getElementById("result").textContent = JSON.stringify(myAddress, undefined, 2);
        `,
          esModule: `
  const { %{0}: { addresses } } = mempoolJS();

  const address = '%{1}';
  const myAddress = await addresses.getAddress({ address });
  console.log(myAddress);
          `,
        },
        codeSampleMainnet: {
          esModule: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          commonJS: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          curl: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          response: `{
  address: "1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC",
  chain_stats: {
    funded_txo_count: 765,
    funded_txo_sum: 87749875807,
    spent_txo_count: 765,
    spent_txo_sum: 87749875807,
    tx_count: 875
  },
  mempool_stats: {
    funded_txo_count: 0,
    funded_txo_sum: 0,
    spent_txo_count: 0,
    spent_txo_sum: 0,
    tx_count: 0
  }
}`
        },
        codeSampleTestnet: {
          esModule: [`tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee`],
          commonJS: [`tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee`],
          curl: [`tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee`],
          response: `{
  address: "tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee",
  chain_stats: {
    funded_txo_count: 6747,
    funded_txo_sum: 84313783821,
    spent_txo_count: 0,
    spent_txo_sum: 0,
    tx_count: 6747
  },
  mempool_stats: {
    funded_txo_count: 0,
    funded_txo_sum: 0,
    spent_txo_count: 0,
    spent_txo_sum: 0,
    tx_count: 0
  }
}`
        },
        codeSampleSignet: {
          esModule: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          commonJS: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          curl: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          response: `{
  address: "1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC",
  chain_stats: {
    funded_txo_count: 765,
    funded_txo_sum: 87749875807,
    spent_txo_count: 765,
    spent_txo_sum: 87749875807,
    tx_count: 875
  },
  mempool_stats: {
    funded_txo_count: 0,
    funded_txo_sum: 0,
    spent_txo_count: 0,
    spent_txo_sum: 0,
    tx_count: 0
  }
}`
        },
        codeSampleLiquid: {
          esModule: [`Go65t19hP2FuhBMYtgbdMDgdmEzNwh1i48`],
          commonJS: [`Go65t19hP2FuhBMYtgbdMDgdmEzNwh1i48`],
          curl: [`Go65t19hP2FuhBMYtgbdMDgdmEzNwh1i48`],
          response: `{
  address: "Go65t19hP2FuhBMYtgbdMDgdmEzNwh1i48",
  chain_stats: {
    funded_txo_count: 1,
    spent_txo_count: 1,
    tx_count: 2
  },
  mempool_stats: {
    funded_txo_count: 0,
    spent_txo_count: 0,
    tx_count: 0
  }
}`
        },
        codeSampleBisq: {
          esModule: [`B1DgwRN92rdQ9xpEVCdXRfgeqGw9X4YtrZz`],
          commonJS: [`B1DgwRN92rdQ9xpEVCdXRfgeqGw9X4YtrZz`],
          curl: [`B1DgwRN92rdQ9xpEVCdXRfgeqGw9X4YtrZz`],
          response: `[
  {
    "txVersion": "1",
    "id": "d6f0a6fd191ac907ff88fc51af91cae8d50e596a846952ffa0ad0cea84eedc9a",
    "blockHeight": 679129,
    "blockHash": "00000000000000000001328850b0482312325f7f4abd5457e45d37cad664675d",
    "time": 1618369311000,
    "inputs": [ ... ],
    "outputs": [ ... ],
    "txType": "PAY_TRADE_FEE",
    "txTypeDisplayString": "Pay trade fee",
    "burntFee": 6,
    "invalidatedBsq": 0,
    "unlockBlockHeight": 0
  },
  ...
]`
        },
      },
      addressTransactions: {
        codeTemplate: {
          curl: `/api/address/%{1}/txs`,
          commonJS: `
        const { %{0}: { addresses } } = mempoolJS();

        const address = '%{1}';
        const addressTxs = await addresses.getAddressTxs({ address });

        document.getElementById("result").textContent = JSON.stringify(addressTxs, undefined, 2);
        `,
          esModule: `
  const { %{0}: { addresses } } = mempoolJS();

  const address = '%{1}';
  const addressTxs = await addresses.getAddressTxs({ address });
  console.log(addressTxs);
          `,
        },
        codeSampleMainnet: {
          esModule: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          commonJS: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          curl: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          response: `[
  {
    txid: "f39fbfd2482ac8a7174fe27caddd66aec05eec0d0e988ddf0de2136a416394c4",
    version: 2,
    locktime: 0,
    vin: [ [Object] ],
    vout: [ [Object], [Object] ],
    size: 251,
    weight: 1004,
    fee: 8212,
    status: {
      confirmed: true,
      block_height: 684536,
      block_hash: "00000000000000000008df08f428ca4e8251ba9171d9060b056f1f94d4fefbc7",
      block_time: 1621687336
    }
  },
  ...
]`
        },
        codeSampleTestnet: {
          esModule: [`tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee`],
          commonJS: [`tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee`],
          curl: [`tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee`],
          response: `[
    {
      txid: "3e6afd67862ce9fe3eb55268a3107f495415ff1b5d1933c928507e9bdf7a21e6",
      version: 2,
      locktime: 0,
      vin: [],
      vout: [],
      size: 211,
      weight: 736,
      fee: 0,
      status: {
        confirmed: true,
        block_height: 2091086,
        block_hash: "00000000340f3667cce7032d084973ca29bdd0d858ec363ed894ad4c8ed09ebc",
        block_time: 1630607773
    }
  },
  ...
]`
        },
        codeSampleSignet: {
          esModule: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          commonJS: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          curl: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          response: `{
  address: "1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC",
  chain_stats: {
    funded_txo_count: 765,
    funded_txo_sum: 87749875807,
    spent_txo_count: 765,
    spent_txo_sum: 87749875807,
    tx_count: 875
  },
  mempool_stats: {
    funded_txo_count: 0,
    funded_txo_sum: 0,
    spent_txo_count: 0,
    spent_txo_sum: 0,
    tx_count: 0
  }
}`
        },
        codeSampleLiquid: {
          esModule: [`Go65t19hP2FuhBMYtgbdMDgdmEzNwh1i48`],
          commonJS: [`Go65t19hP2FuhBMYtgbdMDgdmEzNwh1i48`],
          curl: [`Go65t19hP2FuhBMYtgbdMDgdmEzNwh1i48`],
          response: `[
  {
    txid: "e792f305016fdce71ba4a9c3057279df2b67a7a3e6147b173847a8253ad531ed",
    version: 2,
    locktime: 1438076,
    vin: [Object],
    vout: [Object],
    size: 9205,
    weight: 10492,
    fee: 262,
    status: {
      confirmed: true,
      block_height: 1438078,
      block_hash: "1625ce898d2058f4e609af2e81908ce52eba77dde099667bea68360b5679d5df",
      block_time: 1628564158
    }
  },
  ...
]`
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
      },
      addressTransactionsChain: {
        codeTemplate: {
          curl: `/api/address/%{1}/txs/chain`,
          commonJS: `
        const { %{0}: { addresses } } = mempoolJS();

        const address = '%{1}';
        const addressTxsChain = await addresses.getAddressTxsChain({ address });

        document.getElementById("result").textContent = JSON.stringify(addressTxsChain, undefined, 2);
        `,
          esModule: `
  const { %{0}: { addresses } } = mempoolJS();

  const address = '%{1}';
  const addressTxsChain = await addresses.getAddressTxsChain({ address });
  console.log(addressTxsChain);
          `,
        },
        codeSampleMainnet: {
          esModule: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          commonJS: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          curl: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          response: `[
  {
    txid: "c4e53c2e37f4fac759fdb0d8380e4d49e6c7211233ae276a44ce7074a1d6d168",
    version: 2,
    locktime: 697761,
    vin: [],
    vout: [],
    size: 221,
    weight: 884,
    fee: 331,
    status: {
      confirmed: true,
      block_height: 697782,
      block_hash: "000000000000000000011397e53a5b1442b3dbc5df046c959c11dfe0275a4579",
      block_time: 1630040570
    }
  },
  ...
],`
        },
        codeSampleTestnet: {
          esModule: [`tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee`],
          commonJS: [`tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee`],
          curl: [`tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee`],
          response: `[
  {
    txid: "3e6afd67862ce9fe3eb55268a3107f495415ff1b5d1933c928507e9bdf7a21e6",
    version: 2,
    locktime: 0,
    vin: [],
    vout: [],
    size: 211,
    weight: 736,
    fee: 0,
    status: {
    confirmed: true,
      block_height: 2091086,
      block_hash: "00000000340f3667cce7032d084973ca29bdd0d858ec363ed894ad4c8ed09ebc",
      block_time: 1630607773
    }
  },
  ...
],`
        },
        codeSampleSignet: {
          esModule: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          commonJS: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          curl: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          response: `{
  address: "1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC",
  chain_stats: {
    funded_txo_count: 765,
    funded_txo_sum: 87749875807,
    spent_txo_count: 765,
    spent_txo_sum: 87749875807,
    tx_count: 875
  },
  mempool_stats: {
    funded_txo_count: 0,
    funded_txo_sum: 0,
    spent_txo_count: 0,
    spent_txo_sum: 0,
    tx_count: 0
  }
}`
        },
        codeSampleLiquid: {
          esModule: [`Go65t19hP2FuhBMYtgbdMDgdmEzNwh1i48`],
          commonJS: [`Go65t19hP2FuhBMYtgbdMDgdmEzNwh1i48`],
          curl: [`Go65t19hP2FuhBMYtgbdMDgdmEzNwh1i48`],
          response: `[
  {
    txid: "e792f305016fdce71ba4a9c3057279df2b67a7a3e6147b173847a8253ad531ed",
    version: 2,
    locktime: 1438076,
    vin: [],
    vout: [],
    size: 9205,
    weight: 10492,
    fee: 262,
    status: {
      confirmed: true,
      block_height: 1438078,
      block_hash: "1625ce898d2058f4e609af2e81908ce52eba77dde099667bea68360b5679d5df",
      block_time: 1628564158
    }
  },
  ...
]`
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
      },
      addressTransactionsMempool: {
        codeTemplate: {
          curl: `/api/address/%{1}/txs/mempool`,
          commonJS: `
        const { %{0}: { addresses } } = mempoolJS();

        const address = '%{1}';
        const addressTxsMempool = await addresses.getAddressTxsMempool({ address });

        document.getElementById("result").textContent = JSON.stringify(addressTxsMempool, undefined, 2);
        `,
          esModule: `
  const { %{0}: { addresses } } = mempoolJS();

  const address = '%{1}';
  const addressTxsMempool = await addresses.getAddressTxsMempool({ address });
  console.log(addressTxsMempool);
          `,
        },
        codeSampleMainnet: {
          esModule: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          commonJS: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          curl: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          response: `[
  {
    txid: "16cd9bbc6b62313a22d16671fa559aec6bf581df8b5853d37775c84b0fddfa90",
    version: 2,
    locktime: 0,
    vin: [ [Object] ],
    vout: [ [Object], [Object] ],
    size: 226,
    weight: 904,
    fee: 6720,
    status: { confirmed: false }
  }
]`
        },
        codeSampleTestnet: {
          esModule: [`tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee`],
          commonJS: [`tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee`],
          curl: [`tb1qp0we5epypgj4acd2c4au58045ruud2pd6heuee`],
          response: `[
  {
    txid: "16cd9bbc6b62313a22d16671fa559aec6bf581df8b5853d37775c84b0fddfa90",
    version: 2,
    locktime: 0,
    vin: [ [Object] ],
    vout: [ [Object], [Object] ],
    size: 226,
    weight: 904,
    fee: 6720,
    status: { confirmed: false }
  }
]`
        },
        codeSampleSignet: {
          esModule: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          commonJS: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          curl: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          response: `[
  {
    txid: "16cd9bbc6b62313a22d16671fa559aec6bf581df8b5853d37775c84b0fddfa90",
    version: 2,
    locktime: 0,
    vin: [ [Object] ],
    vout: [ [Object], [Object] ],
    size: 226,
    weight: 904,
    fee: 6720,
    status: { confirmed: false }
  }
]`
        },
        codeSampleLiquid: {
          esModule: [`Go65t19hP2FuhBMYtgbdMDgdmEzNwh1i48`],
          commonJS: [`Go65t19hP2FuhBMYtgbdMDgdmEzNwh1i48`],
          curl: [`Go65t19hP2FuhBMYtgbdMDgdmEzNwh1i48`],
          response: `[
  {
    txid: "16cd9bbc6b62313a22d16671fa559aec6bf581df8b5853d37775c84b0fddfa90",
    version: 2,
    locktime: 0,
    vin: [ [Object] ],
    vout: [ [Object], [Object] ],
    size: 226,
    weight: 904,
    fee: 6720,
    status: { confirmed: false }
  }
]`
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
      },
      addressUTXO: {
        codeTemplate: {
          curl: `/api/address/%{1}/utxo`,
          commonJS: `
        const { %{0}: { addresses } } = mempoolJS();

        const address = '%{1}';
        const addressTxsUtxo = await addresses.getAddressTxsUtxo({ address });

        document.getElementById("result").textContent = JSON.stringify(addressTxsUtxo, undefined, 2);
        `,
          esModule: `
  const { %{0}: { addresses } } = mempoolJS();

  const address = '%{1}';
  const addressTxsUtxo = await addresses.getAddressTxsUtxo({ address });
  console.log(addressTxsUtxo);
          `,
        },
        codeSampleMainnet: {
          esModule: [`1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY`],
          commonJS: [`1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY`],
          curl: [`1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY`],
          response: `[
  {
    txid: "12f96289f8f9cd51ccfe390879a46d7eeb0435d9e0af9297776e6bdf249414ff",
    vout: 0,
    status: {
      confirmed: true,
      block_height: 698642,
      block_hash: "00000000000000000007839f42e0e86fd53c797b64b7135fcad385158c9cafb8",
      block_time: 1630561459
    },
    value: 644951084
  },
  ...
]`
        },
        codeSampleTestnet: {
          esModule: [`tb1q4kgratttzjvkxfmgd95z54qcq7y6hekdm3w56u`],
          commonJS: [`tb1q4kgratttzjvkxfmgd95z54qcq7y6hekdm3w56u`],
          curl: [`tb1q4kgratttzjvkxfmgd95z54qcq7y6hekdm3w56u`],
          response: `[
  {
    txid: "c404bc4ba89e9423ff772cb45268ba6fba8b713f809484c1216f1a657aafa088",
    vout: 1,
    status: {
      confirmed: true,
      block_height: 2086944,
      block_hash: "000000000000039a27007892b0f3ac646afa4eb3ef3d4a4e75e8bdf636b4d006",
      block_time: 1630159123
    },
    value: 1973787
  },
  ...
]`
        },
        codeSampleSignet: {
          esModule: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          commonJS: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          curl: [`1wizSAYSbuyXbt9d8JV8ytm5acqq2TorC`],
          response: `[
  {
    txid: "e58b47f657b496a083ad9a4fb10c744d5e993028efd9cfba149885334d98bdf5",
    vout: 0,
    status: {
      confirmed: true,
      block_height: 698571,
      block_hash: "00000000000000000007536c0a664a7d2a01c31569623183eba0768d9a0c163d",
      block_time: 1630520708
    },
    value: 642070789
  },
  ...
]`
        },
        codeSampleLiquid: {
          esModule: [`GhkYnB1g6oNSqALtcHgpirYM65EuLZdaNg`],
          commonJS: [`GhkYnB1g6oNSqALtcHgpirYM65EuLZdaNg`],
          curl: [`GhkYnB1g6oNSqALtcHgpirYM65EuLZdaNg`],
          response: `[
  {
    txid: "067bac619cc67de7654bb3ee01ebcadf1e582980b3873478bac7d3931f06045f",
    vout: 1,
    status: {
      confirmed: true,
      block_height: 1471900,
      block_hash: "9408b32d41225cea32bace82aac1789a218e6592ab24de5793ca2138b876f536",
      block_time: 1630621258
    },
    valuecommitment: "0805015e56cbbf6cc494cb200615b7f8b781f0d640e4c96b4abdad356068f6346f",
    assetcommitment: "0a6bb828996381a61cb9f24610bea8a0c35efe388d39a993d369e08a6fc358e7dc",
    noncecommitment: "0282f3f01f06e43fb88bcd28e7e83c9c0d9cefc92c104a6e814810c100ec66b33d"
  }
]`,
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
      },
      assets: {
        codeTemplate: {
          curl: `/api/asset/%{1}`,
          commonJS: `
        const { %{0}: { assets } } = mempoolJS();

        const asset_id = '%{1}';
        const asset = await assets.getAsset({ asset_id });

        document.getElementById("result").textContent = JSON.stringify(asset, undefined, 2);
        `,
          esModule: `
  const { %{0}: { assets } } = mempoolJS();

  const asset_id = '%{1}';
  const asset = await assets.getAsset({ asset_id });
  console.log(asset);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
        codeSampleLiquid: {
          esModule: [`6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d`],
          commonJS: [`6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d`],
          curl: [`6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d`],
          response: `{
  asset_id: "6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d",
  chain_stats: {
    tx_count: 3887,
    peg_in_count: 2557,
    peg_in_amount: 328822657766,
    peg_out_count: 1131,
    peg_out_amount: 7427922560,
    burn_count: 199,
    burned_amount: 516003151
  },
  mempool_stats: {
    tx_count: 0,
    peg_in_count: 0,
    peg_in_amount: 0,
    peg_out_count: 0,
    peg_out_amount: 0,
    burn_count: 0,
    burned_amount: 0
  }
}`,
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
      },
      assetTransactions: {
        codeTemplate: {
          curl: `/api/asset/%{1}/txs`,
          commonJS: `
        const { %{0}: { assets } } = mempoolJS();

        const asset_id = '%{1}';
        const assetTxs = await assets.getAssetTxs({ asset_id, is_mempool: false });

        document.getElementById("result").textContent = JSON.stringify(assetTxs, undefined, 2);
        `,
          esModule: `
  const { %{0}: { assets } } = mempoolJS();

  const asset_id = '%{1}';
  const assetTxs = await assets.getAssetTxs({ asset_id, is_mempool: false });
  console.log(assetTxs);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
        codeSampleLiquid: {
          esModule: [`6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d`],
          commonJS: [`6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d`],
          curl: [`6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d`],
          response: `[
  {
    txid: "93fedcc996df43c94f9f12e24b4040b60d47d84ef7a9a66ef05c2e6f4059b685",
    version: 2,
    locktime: 0,
    vin: [],
    vout: [],
    size: 998,
    weight: 1484,
    fee: 42,
    status: {
      confirmed: true,
      block_height: 1471854,
      block_hash: "f113b64f6bc937fda6891fd9f1833d207312f986767aff91aea9649d87533250",
      block_time: 1630618498
    }
  },
  ...
]`,
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
      },
      assetSupply: {
        codeTemplate: {
          curl: `/api/asset/%{1}/supply`,
          commonJS: `
        const { %{0}: { assets } } = mempoolJS();

        const asset_id = '%{1}';
        const assetSupply = await assets.getAssetSupply({ asset_id, decimal: false });

        document.getElementById("result").textContent = JSON.stringify(assetSupply, undefined, 2);
        `,
          esModule: `
  const { %{0}: { assets } } = mempoolJS();

  const asset_id = '%{1}';
  const assetSupply = await assets.getAssetSupply({ asset_id, decimal: false });
  console.log(assetSupply);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
        codeSampleLiquid: {
          esModule: [`6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d`],
          commonJS: [`6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d`],
          curl: [`6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d`],
          response: `320878732055`,
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
      },
      block: {
        codeTemplate: {
          curl: `/api/block/%{1}`,
          commonJS: `
        const { %{0}: { blocks } } = mempoolJS();

        const hash = '%{1}';
        const block = await blocks.getBlock({ hash });

        document.getElementById("result").textContent = JSON.stringify(block, undefined, 2);
        `,
          esModule: `
  const { %{0}: { blocks } } = mempoolJS();

  const hash = '%{1}';
  const block = await blocks.getBlock({ hash });
  console.log(block);
          `,
        },
        codeSampleMainnet: {
          esModule: ['000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce'],
          commonJS: ['000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce'],
          curl: ['000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce'],
          response: `{
  id: "000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce",
  height: 363366,
  version: 2,
  timestamp: 1435766771,
  tx_count: 494,
  size: 286494,
  weight: 1145976,
  merkle_root: "9d3cb87bf05ebae366b4262ed5f768ce8c62fc385c3886c9cb097647b04b686c",
  previousblockhash: "000000000000000010c545b6fa3ef1f7cf45a2a8760b1ee9f2e89673218207ce",
  mediantime: 1435763435,
  nonce: 2892644888,
  bits: 404111758,
  difficulty: 49402014931
}`
        },
        codeSampleTestnet: {
          esModule: ['000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81'],
          commonJS: ['000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81'],
          curl: ['000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81'],
          response: `{
  id: "000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81",
  height: 2091140,
  version: 543162372,
  timestamp: 1630625150,
  tx_count: 2,
  size: 575,
  weight: 1865,
  merkle_root: "5d10d8d158bb8eb217d01fecc435bd10eda028043a913dc2bfe0ccf536a51cc9",
  previousblockhash: "0000000000000073f95d1fc0a93d449f82a754410c635e46264ec6c7c4d5741e",
  mediantime: 1630621997,
  nonce: 1600805744,
  bits: 436273151,
  difficulty: 16777216
}`
        },
        codeSampleSignet: {
          esModule: ['000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152'],
          commonJS: ['000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152'],
          curl: ['000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152'],
          response: `{
  id: "000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152",
  height: 53745,
  version: 536870912,
  timestamp: 1630624390,
  tx_count: 1,
  size: 343,
  weight: 1264,
  merkle_root: "2c1984132841b9f98270274012b22beb7d4ade778cf058e9a44d38de5a111362",
  previousblockhash: "000001497bffdc2347656847647f343afc0eee441a849259335b8a1d79b6aa4a",
  mediantime: 1630621400,
  nonce: 19642021,
  bits: 503404179,
  difficulty: 0
}`
        },
        codeSampleLiquid: {
          esModule: [`86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78`],
          commonJS: [`86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78`],
          curl: [`86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78`],
          response: `{
  id: "86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78",
  height: 1471971,
  version: 570425344,
  timestamp: 1630625518,
  tx_count: 2,
  size: 10841,
  weight: 16913,
  merkle_root: "7e40735e103d6015c90d285d09b535498c0a26df9ca8118b1b4d68aaf80ccf48",
  previousblockhash: "944fa8ffd906b3531af95f3d9b052dfdef0b60657c3c8def2c3591384f083424",
  mediantime: 1630625218,
  ext: {
    challenge: "5b21026a2a106ec32c8a1e8052e5d02a7b0a150423dbd9b116fc48d46630ff6e6a05b92102791646a8b49c2740352b4495c118d876347bf47d0551c01c4332fdc2df526f1a2102888bda53a424466b0451627df22090143bbf7c060e9eacb1e38426f6b07f2ae12102aee8967150dee220f613de3b239320355a498808084a93eaf39a34dcd62024852102d46e9259d0a0bb2bcbc461a3e68f34adca27b8d08fbe985853992b4b104e27412102e9944e35e5750ab621e098145b8e6cf373c273b7c04747d1aa020be0af40ccd62102f9a9d4b10a6d6c56d8c955c547330c589bb45e774551d46d415e51cd9ad5116321033b421566c124dfde4db9defe4084b7aa4e7f36744758d92806b8f72c2e943309210353dcc6b4cf6ad28aceb7f7b2db92a4bf07ac42d357adf756f3eca790664314b621037f55980af0455e4fb55aad9b85a55068bb6dc4740ea87276dc693f4598db45fa210384001daa88dabd23db878dbb1ce5b4c2a5fa72c3113e3514bf602325d0c37b8e21039056d089f2fe72dbc0a14780b4635b0dc8a1b40b7a59106325dd1bc45cc70493210397ab8ea7b0bf85bc7fc56bb27bf85e75502e94e76a6781c409f3f2ec3d1122192103b00e3b5b77884bf3cae204c4b4eac003601da75f96982ffcb3dcb29c5ee419b92103c1f3c0874cfe34b8131af34699589aacec4093399739ae352e8a46f80a6f68375fae",
    solution: "00473045022100b572ef7e8a1c5a795d4ca46ab0221f0296ae081870ec25b3eb3f7db4a9e48d6102207863cfcae9776d3fee8fb2f05f06c879cf16c319b633f09cfac9bf041e662f31463044022056e41068e5448c897f80ef864fbbd71690af375afc33d9a52a12efd399a75c0202203f61333e193e0ff3da1ef15fa5c84c3852bd3b4f701e4bf4ebc0dcb68138d227473045022100af50aae198402aa45764a771d3ec23cf86037ea1e3bd682d09f262d057de1a2c02202f46b42ff1062117001af9689fce666bc50cfd479f63969e28670e26b747610f46304402201bb90d72cd58e5198b135828354e8fcc3e73238e412c6e2474f9d67676b12ceb022053f3a6cbeb85abc5e0bc18a83eeffe7785c382746f50c98a29743eb00d474f9e473045022100954d79ddb28c5682a3600cb4f76433f31606064717c700e5ea626807cfb169cf0220365e42d1d07bd8a65b5cb6e449a6bbd3684bf31f0f31ffe9aa13a1f145f28de2473045022100e8a6566fbd8e2829ac24c02ff78794f0122d828e9c1989ed8c077013a2834c6d022016b6833665bbe9ca930247600694f90d40aeb9880fdf95ef62b553efb516997f473045022100c0dca22bfc3a3f64f1ac221796ecd052c153e03732e696ce891be4998c6ae34a0220650ff2e1af0cf3318e249e358738d69de91ebdc81535234a30bdbc4361edc08246304402205f0db67365c3667b93cbcfaa2e5a26a4dbab15a5e39196008fd84b61de358f89022035d5bca676b62028e17f962ef7a33b9f34534f02f3d1ac57b65a666f6d33b3fa473045022100ae711c250c7e4a9d7795e96a4209d05f2b4866473aa2a35b8478b9e3eec883800220514db41ba950cf089cce8fd71cfc41454c80005c2c57401da0e2fb3ce96097bc473045022100bfc416e16fb246cc21a3729359bcf9a752643f4c57190493418dab5df33ff8190220289600af6dc32bffb000f984c8c37f137841e1738c701e05c0a08be53e5eb62b473045022100accf30feb32423e20ddaae3c12584b33ad4eb6492deed1393175a0443832faa0022045b17184460ece57857fe74143166c3692348758054d3d7852fee833cb66e9c4"
  }
}`,
        },
        codeSampleBisq: {
          esModule: ['0000000000000000000b24f70ed27da8b282b050f38e20831923211a1f7266d5'],
          commonJS: ['0000000000000000000b24f70ed27da8b282b050f38e20831923211a1f7266d5'],
          curl: ['0000000000000000000b24f70ed27da8b282b050f38e20831923211a1f7266d5'],
          response: `{
  height: 698746,
  time: 1630621494000,
  hash: "0000000000000000000b24f70ed27da8b282b050f38e20831923211a1f7266d5",
  previousBlockHash: "000000000000000000039cd226a99c125ee3004e9d585b04e2ccceccddef7547",
  txs: []
}`
        },
      },
      blockHeader: {
        codeTemplate: {
          curl: `/api/block/%{1}/header`,
          commonJS: `
        const { %{0}: { blocks } } = mempoolJS();

        const hash = '%{1}';
        const blockHeader = await blocks.getBlockHeader({ height: 0 });

        document.getElementById("result").textContent = JSON.stringify(blockHeight, undefined, 2);
        `,
          esModule: `
  const { %{0}: { blocks } } = mempoolJS();

  const hash = '%{1}';
  const blockHeader = await blocks.getBlockHeader({ height: 0 });
  console.log(blockHeight);
          `,
        },
        codeSampleMainnet: {
          esModule: ['0000000000000000000065bda8f8a88f2e1e00d9a6887a43d640e52a4c7660f2'],
          commonJS: ['0000000000000000000065bda8f8a88f2e1e00d9a6887a43d640e52a4c7660f2'],
          curl: ['0000000000000000000065bda8f8a88f2e1e00d9a6887a43d640e52a4c7660f2'],
          response: `040000202c04d4c450187d1da9b1bc23ba47d67fe028d22486fd0c00000000000000000059a3a33d4642c799af9f54a4dd351fff9130e6a89d4e251130c60064878616e906b5ea60ce9813173a25caf3`
        },
        codeSampleTestnet: {
          esModule: ['000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81'],
          commonJS: ['000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81'],
          curl: ['000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81'],
          response: `040060201e74d5c4c7c64e26465e630c4154a7829f443da9c01f5df97300000000000000c91ca536f5cce0bfc23d913a0428a0ed10bd35c4ec1fd017b28ebb58d1d8105d7e5d3161ffff001a705b6a5f`
        },
        codeSampleSignet: {
          esModule: ['000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152'],
          commonJS: ['000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152'],
          curl: ['000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152'],
          response: `000000204aaab6791d8a5b335992841a44ee0efc3a347f644768654723dcff7b490100006213115ade384da4e958f08c77de4a7deb2bb21240277082f9b941281384192c865a31619356011ea5b62b01`
        },
        codeSampleLiquid: {
          esModule: [`86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78`],
          commonJS: [`86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78`],
          curl: [`86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78`],
          response: `000000222434084f3891352cef8d3c7c65600beffd2d059b3d5ff91a53b306d9ffa84f9448cf0cf8aa684d1b8b11a89cdf260a8c4935b5095d280dc915603d105e73407eee5e3161e3751600fd01025b21026a2a106ec32c8a1e8052e5d02a7b0a150423dbd9b116fc48d46630ff6e6a05b92102791646a8b49c2740352b4495c118d876347bf47d0551c01c4332fdc2df526f1a2102888bda53a424466b0451627df22090143bbf7c060e9eacb1e38426f6b07f2ae12102aee8967150dee220f613de3b239320355a498808084a93eaf39a34dcd62024852102d46e9259d0a0bb2bcbc461a3e68f34adca27b8d08fbe985853992b4b104e27412102e9944e35e5750ab621e098145b8e6cf373c273b7c04747d1aa020be0af40ccd62102f9a9d4b10a6d6c56d8c955c547330c589bb45e774551d46d415e51cd9ad5116321033b421566c124dfde4db9defe4084b7aa4e7f36744758d92806b8f72c2e943309210353dcc6b4cf6ad28aceb7f7b2db92a4bf07ac42d357adf756f3eca790664314b621037f55980af0455e4fb55aad9b85a55068bb6dc4740ea87276dc693f4598db45fa210384001daa88dabd23db878dbb1ce5b4c2a5fa72c3113e3514bf602325d0c37b8e21039056d089f2fe72dbc0a14780b4635b0dc8a1b40b7a59106325dd1bc45cc70493210397ab8ea7b0bf85bc7fc56bb27bf85e75502e94e76a6781c409f3f2ec3d1122192103b00e3b5b77884bf3cae204c4b4eac003601da75f96982ffcb3dcb29c5ee419b92103c1f3c0874cfe34b8131af34699589aacec4093399739ae352e8a46f80a6f68375faefd160300473045022100b572ef7e8a1c5a795d4ca46ab0221f0296ae081870ec25b3eb3f7db4a9e48d6102207863cfcae9776d3fee8fb2f05f06c879cf16c319b633f09cfac9bf041e662f31463044022056e41068e5448c897f80ef864fbbd71690af375afc33d9a52a12efd399a75c0202203f61333e193e0ff3da1ef15fa5c84c3852bd3b4f701e4bf4ebc0dcb68138d227473045022100af50aae198402aa45764a771d3ec23cf86037ea1e3bd682d09f262d057de1a2c02202f46b42ff1062117001af9689fce666bc50cfd479f63969e28670e26b747610f46304402201bb90d72cd58e5198b135828354e8fcc3e73238e412c6e2474f9d67676b12ceb022053f3a6cbeb85abc5e0bc18a83eeffe7785c382746f50c98a29743eb00d474f9e473045022100954d79ddb28c5682a3600cb4f76433f31606064717c700e5ea626807cfb169cf0220365e42d1d07bd8a65b5cb6e449a6bbd3684bf31f0f31ffe9aa13a1f145f28de2473045022100e8a6566fbd8e2829ac24c02ff78794f0122d828e9c1989ed8c077013a2834c6d022016b6833665bbe9ca930247600694f90d40aeb9880fdf95ef62b553efb516997f473045022100c0dca22bfc3a3f64f1ac221796ecd052c153e03732e696ce891be4998c6ae34a0220650ff2e1af0cf3318e249e358738d69de91ebdc81535234a30bdbc4361edc08246304402205f0db67365c3667b93cbcfaa2e5a26a4dbab15a5e39196008fd84b61de358f89022035d5bca676b62028e17f962ef7a33b9f34534f02f3d1ac57b65a666f6d33b3fa473045022100ae711c250c7e4a9d7795e96a4209d05f2b4866473aa2a35b8478b9e3eec883800220514db41ba950cf089cce8fd71cfc41454c80005c2c57401da0e2fb3ce96097bc473045022100bfc416e16fb246cc21a3729359bcf9a752643f4c57190493418dab5df33ff8190220289600af6dc32bffb000f984c8c37f137841e1738c701e05c0a08be53e5eb62b473045022100accf30feb32423e20ddaae3c12584b33ad4eb6492deed1393175a0443832faa0022045b17184460ece57857fe74143166c3692348758054d3d7852fee833cb66e9c4`,
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
      },
      blockHeight: {
        codeTemplate: {
          curl: `/api/block/%{1}/header`,
          commonJS: `
        const { %{0}: { blocks } } = mempoolJS();

        const hash = '%{1}';
        const blockHeight = await blocks.getBlockHeight({ height: 0 });

        document.getElementById("result").textContent = JSON.stringify(blockHeight, undefined, 2);
        `,
          esModule: `
  const { %{0}: { blocks } } = mempoolJS();

  const hash = '%{1}';
  const blockHeight = await blocks.getBlockHeight({ height: 0 });
  console.log(blockHeight);
          `,
        },
        codeSampleMainnet: {
          esModule: ['0000000000000000000065bda8f8a88f2e1e00d9a6887a43d640e52a4c7660f2'],
          commonJS: ['0000000000000000000065bda8f8a88f2e1e00d9a6887a43d640e52a4c7660f2'],
          curl: ['0000000000000000000065bda8f8a88f2e1e00d9a6887a43d640e52a4c7660f2'],
          response: `040000202c04d4c450187d1da9b1bc23ba47d67fe028d22486fd0c00000000000000000059a3a33d4642c799af9f54a4dd351fff9130e6a89d4e251130c60064878616e906b5ea60ce9813173a25caf3`
        },
        codeSampleTestnet: {
          esModule: ['000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81'],
          commonJS: ['000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81'],
          curl: ['000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81'],
          response: `040060201e74d5c4c7c64e26465e630c4154a7829f443da9c01f5df97300000000000000c91ca536f5cce0bfc23d913a0428a0ed10bd35c4ec1fd017b28ebb58d1d8105d7e5d3161ffff001a705b6a5f`
        },
        codeSampleSignet: {
          esModule: ['000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152'],
          commonJS: ['000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152'],
          curl: ['000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152'],
          response: `000000204aaab6791d8a5b335992841a44ee0efc3a347f644768654723dcff7b490100006213115ade384da4e958f08c77de4a7deb2bb21240277082f9b941281384192c865a31619356011ea5b62b01`
        },
        codeSampleLiquid: {
          esModule: [`86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78`],
          commonJS: [`86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78`],
          curl: [`86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78`],
          response: `000000222434084f3891352cef8d3c7c65600beffd2d059b3d5ff91a53b306d9ffa84f9448cf0cf8aa684d1b8b11a89cdf260a8c4935b5095d280dc915603d105e73407eee5e3161e3751600fd01025b21026a2a106ec32c8a1e8052e5d02a7b0a150423dbd9b116fc48d46630ff6e6a05b92102791646a8b49c2740352b4495c118d876347bf47d0551c01c4332fdc2df526f1a2102888bda53a424466b0451627df22090143bbf7c060e9eacb1e38426f6b07f2ae12102aee8967150dee220f613de3b239320355a498808084a93eaf39a34dcd62024852102d46e9259d0a0bb2bcbc461a3e68f34adca27b8d08fbe985853992b4b104e27412102e9944e35e5750ab621e098145b8e6cf373c273b7c04747d1aa020be0af40ccd62102f9a9d4b10a6d6c56d8c955c547330c589bb45e774551d46d415e51cd9ad5116321033b421566c124dfde4db9defe4084b7aa4e7f36744758d92806b8f72c2e943309210353dcc6b4cf6ad28aceb7f7b2db92a4bf07ac42d357adf756f3eca790664314b621037f55980af0455e4fb55aad9b85a55068bb6dc4740ea87276dc693f4598db45fa210384001daa88dabd23db878dbb1ce5b4c2a5fa72c3113e3514bf602325d0c37b8e21039056d089f2fe72dbc0a14780b4635b0dc8a1b40b7a59106325dd1bc45cc70493210397ab8ea7b0bf85bc7fc56bb27bf85e75502e94e76a6781c409f3f2ec3d1122192103b00e3b5b77884bf3cae204c4b4eac003601da75f96982ffcb3dcb29c5ee419b92103c1f3c0874cfe34b8131af34699589aacec4093399739ae352e8a46f80a6f68375faefd160300473045022100b572ef7e8a1c5a795d4ca46ab0221f0296ae081870ec25b3eb3f7db4a9e48d6102207863cfcae9776d3fee8fb2f05f06c879cf16c319b633f09cfac9bf041e662f31463044022056e41068e5448c897f80ef864fbbd71690af375afc33d9a52a12efd399a75c0202203f61333e193e0ff3da1ef15fa5c84c3852bd3b4f701e4bf4ebc0dcb68138d227473045022100af50aae198402aa45764a771d3ec23cf86037ea1e3bd682d09f262d057de1a2c02202f46b42ff1062117001af9689fce666bc50cfd479f63969e28670e26b747610f46304402201bb90d72cd58e5198b135828354e8fcc3e73238e412c6e2474f9d67676b12ceb022053f3a6cbeb85abc5e0bc18a83eeffe7785c382746f50c98a29743eb00d474f9e473045022100954d79ddb28c5682a3600cb4f76433f31606064717c700e5ea626807cfb169cf0220365e42d1d07bd8a65b5cb6e449a6bbd3684bf31f0f31ffe9aa13a1f145f28de2473045022100e8a6566fbd8e2829ac24c02ff78794f0122d828e9c1989ed8c077013a2834c6d022016b6833665bbe9ca930247600694f90d40aeb9880fdf95ef62b553efb516997f473045022100c0dca22bfc3a3f64f1ac221796ecd052c153e03732e696ce891be4998c6ae34a0220650ff2e1af0cf3318e249e358738d69de91ebdc81535234a30bdbc4361edc08246304402205f0db67365c3667b93cbcfaa2e5a26a4dbab15a5e39196008fd84b61de358f89022035d5bca676b62028e17f962ef7a33b9f34534f02f3d1ac57b65a666f6d33b3fa473045022100ae711c250c7e4a9d7795e96a4209d05f2b4866473aa2a35b8478b9e3eec883800220514db41ba950cf089cce8fd71cfc41454c80005c2c57401da0e2fb3ce96097bc473045022100bfc416e16fb246cc21a3729359bcf9a752643f4c57190493418dab5df33ff8190220289600af6dc32bffb000f984c8c37f137841e1738c701e05c0a08be53e5eb62b473045022100accf30feb32423e20ddaae3c12584b33ad4eb6492deed1393175a0443832faa0022045b17184460ece57857fe74143166c3692348758054d3d7852fee833cb66e9c4`,
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
      },
      blockRaw: {
        codeTemplate: {
          curl: `/api/block/%{1}/raw`,
          commonJS: `
        const { %{0}: { blocks } } = mempoolJS();

        const hash = '%{1}';
        const blockRaw = await blocks.getBlockRaw({ hash });

        document.getElementById("result").textContent = JSON.stringify(blockRaw, undefined, 2);
        `,
          esModule: `
  const { %{0}: { blocks } } = mempoolJS();

  const hash = '%{1}';
  const blockRaw = await blocks.getBlockRaw({ hash });
  console.log(blockRaw);
          `,
        },
        codeSampleMainnet: {
          esModule: ['0000000000000000000065bda8f8a88f2e1e00d9a6887a43d640e52a4c7660f2'],
          commonJS: ['0000000000000000000065bda8f8a88f2e1e00d9a6887a43d640e52a4c7660f2'],
          curl: ['0000000000000000000065bda8f8a88f2e1e00d9a6887a43d640e52a4c7660f2'],
          response: '',
        },
        codeSampleTestnet: {
          esModule: ['000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81'],
          commonJS: ['000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81'],
          curl: ['000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81'],
          response: '',
        },
        codeSampleSignet: {
          esModule: ['000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152'],
          commonJS: ['000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152'],
          curl: ['000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152'],
          response: '',
        },
        codeSampleLiquid: {
          esModule: [`86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78`],
          commonJS: [`86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78`],
          curl: [`86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78`],
          response: '',
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: '',
        },
      },
      blockStatus: {
        codeTemplate: {
          curl: `/api/block/%{1}/status`,
          commonJS: `
        const { %{0}: { blocks } } = mempoolJS();

        const hash = '%{1}';
        const blockStatus = await blocks.getBlockStatus({ hash });

        document.getElementById("result").textContent = JSON.stringify(blockStatus, undefined, 2);
        `,
          esModule: `
  const { %{0}: { blocks } } = mempoolJS();

  const hash = '%{1}';
  const blockStatus = await blocks.getBlockStatus({ hash });
  console.log(blockStatus);
          `,
        },
        codeSampleMainnet: {
          esModule: ['0000000000000000000065bda8f8a88f2e1e00d9a6887a43d640e52a4c7660f2'],
          commonJS: ['0000000000000000000065bda8f8a88f2e1e00d9a6887a43d640e52a4c7660f2'],
          curl: ['0000000000000000000065bda8f8a88f2e1e00d9a6887a43d640e52a4c7660f2'],
          response: `{
  in_best_chain: true,
  height: 690557,
  next_best: "00000000000000000003a59a34c93e39e636c8cd23ead726fdc467fbed0b7c5a"
}`
        },
        codeSampleTestnet: {
          esModule: ['000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81'],
          commonJS: ['000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81'],
          curl: ['000000000000009c08dc77c3f224d9f5bbe335a78b996ec1e0701e065537ca81'],
          response: `{
  in_best_chain: true,
  height: 2091140,
  next_best: "0000000000000064152f2dc1e13bd70811fbcfa9c1660557233668b98b7b1c2b"
}`
        },
        codeSampleSignet: {
          esModule: ['000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152'],
          commonJS: ['000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152'],
          curl: ['000000ca66fab8083d4f0370d499c3d602e78af5fa69b2427cda15a3f0d96152'],
          response: `{
  in_best_chain: true,
  height: 53745,
  next_best: "000000e9c2a969f6a3425ab70851328e878ebdeb90b73f9cfb16241b97c44640"
}`
        },
        codeSampleLiquid: {
          esModule: [`86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78`],
          commonJS: [`86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78`],
          curl: [`86aefdd3cf7be8e5781f783fe5d80513e8b3f52f2f1ef61e8e056b7faffc4b78`],
          response: `{
  in_best_chain: true,
  height: 1471971,
  next_best: "1ce5b14c5fbc05be73d8833839e049fd34212da902a78118cd8502a95bf9c134"
}`,
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
      },
      blockTipHeight: {
        codeTemplate: {
          curl: `/api/blocks/tip/height`,
          commonJS: `
        const { %{0}: { blocks } } = mempoolJS();

        const blocksTipHeight = await blocks.getBlocksTipHeight();

        document.getElementById("result").textContent = JSON.stringify(blocksTipHeight, undefined, 2);
        `,
          esModule: `
  const { %{0}: { blocks } } = mempoolJS();

  const blocksTipHeight = await blocks.getBlocksTipHeight();
  console.log(blocksTipHeight);
          `,
        },
        codeSampleMainnet: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: `698767`
        },
        codeSampleTestnet: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: `2091168`
        },
        codeSampleSignet: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: `53763`
        },
        codeSampleLiquid: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: `1472119`,
        },
        codeSampleBisq: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: `698765`
        },
      },
      blockTipHash: {
        codeTemplate: {
          curl: `/api/blocks/tip/hash`,
          commonJS: `
        const { %{0}: { blocks } } = mempoolJS();

        const blocksTipHash = await blocks.getBlocksTipHash();

        document.getElementById("result").textContent = JSON.stringify(blocksTipHash, undefined, 2);
        `,
          esModule: `
  const { %{0}: { blocks } } = mempoolJS();

  const blocksTipHash = await blocks.getBlocksTipHash();
  console.log(blocksTipHash);
          `,
        },
        codeSampleMainnet: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: `0000000000000000000624d76f52661d0f35a0da8b93a87cb93cf08fd9140209`
        },
        codeSampleTestnet: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: `00000000000000a7a5227bb493ffb90d1e63e1c7e8cab2c9a2b98e9f2599a9a9`
        },
        codeSampleSignet: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: `000000c09517efadf7425f7c19543b69768aaa9871a817d192d2c33cebebf3f9`
        },
        codeSampleLiquid: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: `ec8fed6f33cba86f99b39ae65af948bfc2fdb95cceaa7331bbfd88f5daa823a2`,
        },
        codeSampleBisq: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: ``
        },
      },
      blockTxId: {
        codeTemplate: {
          curl: `/api/block/%{1}/txid/%{2}`,
          commonJS: `
        const { %{0}: { blocks } } = mempoolJS();

        const hash = '%{1}';
        const blockTxid = await blocks.getBlockTxid({ hash, index: %{2} });

        document.getElementById("result").textContent = JSON.stringify(blockTxid, undefined, 2);
        `,
          esModule: `
  const { %{0}: { blocks } } = mempoolJS();

  const hash = '%{1}';
  const blockTxid = await blocks.getBlockTxid({ hash, index: %{2} });
  console.log(blockTxid);
          `,
        },
        codeSampleMainnet: {
          esModule: ['000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce', '218'],
          commonJS: ['000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce', '218'],
          curl: ['000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce', '218'],
          response: `0fa6da60e484941f255cbb025c3d6440e5a7e970119e899b4065c7999360e406`
        },
        codeSampleTestnet: {
          esModule: ['000000000000004a3ff1faff12c446f711c650454ff8af7f41d1e8b2564dd74b', '1'],
          commonJS: ['000000000000004a3ff1faff12c446f711c650454ff8af7f41d1e8b2564dd74b', '1'],
          curl: ['000000000000004a3ff1faff12c446f711c650454ff8af7f41d1e8b2564dd74b', '1'],
          response: `7aede67cd9f48c2f77ca9112c27da2583ea41fbb391652777c44ef21d5b1656e`
        },
        codeSampleSignet: {
          esModule: ['0000014b62b53d2550c310208af9d792ab7a9a2487a67d82c06b17b201ee602f', '1'],
          commonJS: ['0000014b62b53d2550c310208af9d792ab7a9a2487a67d82c06b17b201ee602f', '1'],
          curl: ['0000014b62b53d2550c310208af9d792ab7a9a2487a67d82c06b17b201ee602f', '1'],
          response: `b72a9a7cfbb0685e393f86fa1fa1c43c2888b9ad01c9ac48a28b98e2c8721a89`
        },
        codeSampleLiquid: {
          esModule: ['dbbf73007879859f2c55b8605751498ad0d2848db0fdedeadcbdc0cf4f02ee13', '1'],
          commonJS: ['dbbf73007879859f2c55b8605751498ad0d2848db0fdedeadcbdc0cf4f02ee13', '1'],
          curl: ['dbbf73007879859f2c55b8605751498ad0d2848db0fdedeadcbdc0cf4f02ee13', '1'],
          response: `36e47770c306ae5d4ddcc2ce50f6ce6e23d6bdc692b9a9a347fb68d19255f598`
        },
        codeSampleBisq: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: ``
        },
      },
      blockTxIds: {
        codeTemplate: {
          curl: `/api/block/%{1}/txids`,
          commonJS: `
        const { %{0}: { blocks } } = mempoolJS();

        const hash = '%{1}';
        const blockTxids = await blocks.getBlockTxids({ hash });

        document.getElementById("result").textContent = JSON.stringify(blockTxids, undefined, 2);
        `,
          esModule: `
  const { %{0}: { blocks } } = mempoolJS();

  const hash = '%{1}';
  const blockTxids = await blocks.getBlockTxids({ hash });
  console.log(blockTxids);
          `,
        },
        codeSampleMainnet: {
          esModule: ['000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce', '218'],
          commonJS: ['000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce', '218'],
          curl: ['000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce', '218'],
          response: `[
  "cfe624ccdd8010cf78dbedd1b25e1ff601b470c4d7d90fa9fc8c1bcc5cdc6e0e",
  "a5ef89881bd5103f223a0fa285dfc75f4718974cb792cf85e623a7de05801bc9",
  ...,
]`
        },
        codeSampleTestnet: {
          esModule: ['000000000000004a3ff1faff12c446f711c650454ff8af7f41d1e8b2564dd74b', '1'],
          commonJS: ['000000000000004a3ff1faff12c446f711c650454ff8af7f41d1e8b2564dd74b', '1'],
          curl: ['000000000000004a3ff1faff12c446f711c650454ff8af7f41d1e8b2564dd74b', '1'],
          response: `[
  "b5d033f57045b76f2f29df0c2469be0153ecf2514717bccd8d52250b3e7ba781",
  "7aede67cd9f48c2f77ca9112c27da2583ea41fbb391652777c44ef21d5b1656e",
  "20827f9a8fb5ec5fa55ce5389b1d7520d7961272492dc3424874887daeea21dc"
]`
        },
        codeSampleSignet: {
          esModule: ['0000014b62b53d2550c310208af9d792ab7a9a2487a67d82c06b17b201ee602f', '1'],
          commonJS: ['0000014b62b53d2550c310208af9d792ab7a9a2487a67d82c06b17b201ee602f', '1'],
          curl: ['0000014b62b53d2550c310208af9d792ab7a9a2487a67d82c06b17b201ee602f', '1'],
          response: `[
  "4220d4fe0ec4beb9313e15fa225fb0bbdf2c17d74b56615e07263aed32d4fdb2",
  "b72a9a7cfbb0685e393f86fa1fa1c43c2888b9ad01c9ac48a28b98e2c8721a89",
  "0597e9355e868f98560b0e30d0c6b9f5e7c0f004c376ef26850f61096fabb692",
  "857ff0a341b14aae2e45122d458f13d0d744cc1081ef0ae2aaec32c01587d1c0",
  "6062ac26ef4b0c9b5343bdf46c1677297f85705f523472a96383af276a20b0da",
  "a469bed29a54ef3ed5d00c472f10603ed3ee7c4972fc3cb623e738d628064d19",
  "ca1a3d14d88dc72a5cb6da198c7151f1f71718ee4b4ba70d6bc597a260b0ab20",
  "7516b5aaeaab70a735f47b4e100421363cef535378d522a3244ac8741b9d6740",
  "ee428b6be6df6655ddcbfd64bb3a8fa8de513c4f50d94c1ef91df1254cf45172",
  "7cf09ecd458613cd3817754286d356fd91efa8456cc9fdc744b65dd6e01ca6ab",
  "43082dda77028f2ccab3639c919aea6049fd3917a5f3f413f0ee12ca4daf4ad6",
  "13e4c56fdc40928e8639d19aefff23270ea5555c6e8887fd95b609c50297cbe0",
  "99bcab11aab1ccb4b2881e5fb0e9b788b8ee0064caa0915e3de62ff8ea65adf5"
]`
        },
        codeSampleLiquid: {
          esModule: ['dbbf73007879859f2c55b8605751498ad0d2848db0fdedeadcbdc0cf4f02ee13', '1'],
          commonJS: ['dbbf73007879859f2c55b8605751498ad0d2848db0fdedeadcbdc0cf4f02ee13', '1'],
          curl: ['dbbf73007879859f2c55b8605751498ad0d2848db0fdedeadcbdc0cf4f02ee13', '1'],
          response: `[
  "45abcc4572f519155cd65686c3be9cc744d79d6f36c928b0aa3c989f8ee094be",
  "36e47770c306ae5d4ddcc2ce50f6ce6e23d6bdc692b9a9a347fb68d19255f598"
]`
        },
        codeSampleBisq: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: ``
        },
      },
      blockTxs: {
        codeTemplate: {
          curl: `/api/block/%{1}/txs`,
          commonJS: `
        const { %{0}: { blocks } } = mempoolJS();

        const hash = '%{1}';
        const blockTxs = await blocks.getBlockTxs({ hash });

        document.getElementById("result").textContent = JSON.stringify(blockTxs, undefined, 2);
        `,
          esModule: `
  const { %{0}: { blocks } } = mempoolJS();

  const hash = '%{1}';
  const blockTxs = await blocks.getBlockTxs({ hash });
  console.log(blockTxs);
          `,
        },
        codeSampleMainnet: {
          esModule: ['000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce'],
          commonJS: ['000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce'],
          curl: ['000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce'],
          response: `[
  {
    txid: "cfe624ccdd8010cf78dbedd1b25e1ff601b470c4d7d90fa9fc8c1bcc5cdc6e0e",
    version: 1,
    locktime: 0,
    vin: [],
    vout: [],
    size: 102,
    weight: 408,
    fee: 0,
    status: {
      confirmed: true,
      block_height: 363366,
      block_hash: "000000000000000015dc777b3ff2611091336355d3f0ee9766a2cf3be8e4b1ce",
      block_time: 1435766771
    }
  },
  ...
]`
        },
        codeSampleTestnet: {
          esModule: ['000000000000004a3ff1faff12c446f711c650454ff8af7f41d1e8b2564dd74b'],
          commonJS: ['000000000000004a3ff1faff12c446f711c650454ff8af7f41d1e8b2564dd74b'],
          curl: ['000000000000004a3ff1faff12c446f711c650454ff8af7f41d1e8b2564dd74b'],
          response: `[
  {
    txid: "b5d033f57045b76f2f29df0c2469be0153ecf2514717bccd8d52250b3e7ba781",
    version: 2,
    locktime: 0,
    vin: [],
    vout: [],
    size: 238,
    weight: 844,
    fee: 0,
    status: {
      confirmed: true,
      block_height: 2091173,
      block_hash: "000000000000004a3ff1faff12c446f711c650454ff8af7f41d1e8b2564dd74b",
      block_time: 1630635771
    }
  },
  ...
],`
        },
        codeSampleSignet: {
          esModule: ['0000014b62b53d2550c310208af9d792ab7a9a2487a67d82c06b17b201ee602f'],
          commonJS: ['0000004b62b53d2550c300208af9d792ab7a9a2487a67d82c06b17b201ee602f'],
          curl: ['0000014b60b53d2550c310200af9d792ab7a9a2487a67d82c06b17b201ee602f'],
          response: `[
  {
    txid: "4220d4fe0ec4beb9313e15fa225fb0bbdf2c17d74b56615e07263aed32d4fdb2",
    version: 1,
    locktime: 0,
    vin: [],
    vout: [],
    size: 250,
    weight: 892,
    fee: 0,
    status: {
      confirmed: true,
      block_height: 53770,
      block_hash: "0000014b62b53d2550c310208af9d792ab7a9a2487a67d82c06b17b201ee602f",
      block_time: 1630635847
    }
  },
  ...
]`,
        },
        codeSampleLiquid: {
          esModule: ['dbbf73007879859f2c55b8605751498ad0d2848db0fdedeadcbdc0cf4f02ee13', '1'],
          commonJS: ['dbbf73007879859f2c55b8605751498ad0d2848db0fdedeadcbdc0cf4f02ee13', '1'],
          curl: ['dbbf73007879859f2c55b8605751498ad0d2848db0fdedeadcbdc0cf4f02ee13', '1'],
          response: `[
  {
    txid: "45abcc4572f519155cd65686c3be9cc744d79d6f36c928b0aa3c989f8ee094be",
    version: 2,
    locktime: 0,
    vin: [],
    vout: [],
    size: 250,
    weight: 877,
    fee: 0,
    status: {
      confirmed: true,
      block_height: 1472142,
      block_hash: "dbbf73007879859f2c55b8605751498ad0d2848db0fdedeadcbdc0cf4f02ee13",
      block_time: 1630635778
    }
  },
  ...
]`
        },
        codeSampleBisq: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: ``
        },
      },
      blocks: {
        codeTemplate: {
          curl: `/api/blocks/%{1}`,
          commonJS: `
        const { %{0}: { blocks } } = mempoolJS();

        const getBlocks = await blocks.getBlocks({ start_height: %{1} });

        document.getElementById("result").textContent = JSON.stringify(getBlocks, undefined, 2);
        `,
          esModule: `
  const { %{0}: { blocks } } = mempoolJS();

  const getBlocks = await blocks.getBlocks({ start_height: %{1} });
  console.log(getBlocks);
          `,
        },
        codeSampleMainnet: {
          esModule: ['698777'],
          commonJS: ['698777'],
          curl: ['698777'],
          response: `[
  {
    id: "00000000000000000003002915e015c47610c55b6f0228ad62bfcc59b65e67b7",
    height: 698777,
    version: 536870916,
    timestamp: 1630641711,
    tx_count: 2327,
    size: 1466537,
    weight: 3999653,
    merkle_root: "023e27dde144eedc65ff3b27c535ebc7dced6c49fe78f94cdf85cf2000608d2f",
    previousblockhash: "0000000000000000000701a7f14e362d3f10aa524200db1710ce3bbf0c0f8b75",
    mediantime: 1630636986,
    nonce: 1926094388,
    bits: 386923168,
    difficulty: 17615033039278
  },
  ...
]`
        },
        codeSampleTestnet: {
          esModule: ['2091187'],
          commonJS: ['2091187'],
          curl: ['2091187'],
          response: `[
  {
    id: "00000000000000533f63df886281a9fd74da163e84a21445153ff480e5f57970",
    height: 2091187,
    version: 545259520,
    timestamp: 1630641890,
    tx_count: 26,
    size: 8390,
    weight: 22985,
    merkle_root: "4d6df12a4af11bb928c7b2930e0a4d2c3e268c6dc6a07462943ad1c4b6b96468",
    previousblockhash: "0000000000000079103da7d296e1480295df795b7379e7dffd27743e214b0b32",
    mediantime: 1630639627,
    nonce: 309403673,
    bits: 436273151,
    difficulty: 16777216
  },
  ...
]`
        },
        codeSampleSignet: {
          esModule: ['53783'],
          commonJS: ['53783'],
          curl: ['53783'],
          response: `[
  {
    id: "0000010eeacb878340bae34af4e13551413d76a172ec302f7e50b62cb45374f2",
    height: 53783,
    version: 536870912,
    timestamp: 1630641504,
    tx_count: 1,
    size: 343,
    weight: 1264,
    merkle_root: "3063ff3802c920eea68bdc9303957f3e7bfd0a03c93547fd7dad14b77a07d4e8",
    previousblockhash: "00000109a7ea774fcc2d173f9a1da9595a47ff401dac67ca9edea149954210fa",
    mediantime: 1630638966,
    nonce: 11753379,
    bits: 503404179,
    difficulty: 0
  },
  ...
]`
        },
        codeSampleLiquid: {
          esModule: ['1472246'],
          commonJS: ['1472246'],
          curl: ['1472246'],
          response: `[
  {
    id: "0bd348c08101fef863b7263b2b44b2f6575f707f1e397da95cfe2afdd5e9ccdb",
    height: 1472246,
    version: 570425344,
    timestamp: 1630642018,
    tx_count: 2,
    size: 10838,
    weight: 16901,
    merkle_root: "a8cdc1ba96d1f862ca7c9aec4133a6efd14138f54c17efdbc968632a6b9cb8c8",
    previousblockhash: "a06c327cdd76301de57ba0cf86c5ae8b1fd8a785945065ac9e2128322bd01f31",
    mediantime: 1630641718
  },
  ...
]`
        },
        codeSampleBisq: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: ``
        },
      },
      blocksBisq: {
        codeTemplate: {
          curl: `/api/blocks/%{1}/%{2}`,
          commonJS: `
        const { %{0}: { blocks } } = mempoolJS();

        const getBlocks = await blocks.getBlocks({ index: %{1}, length: %{2} });

        document.getElementById("result").textContent = JSON.stringify(getBlocks, undefined, 2);
        `,
          esModule: `
  const { %{0}: { blocks } } = mempoolJS();

  const getBlocks = await blocks.getBlocks({ index: %{1}, length: %{2} });
  console.log(getBlocks);
          `,
        },
        codeSampleMainnet: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: ``
        },
        codeSampleTestnet: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: ``
        },
        codeSampleSignet: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: ``
        },
        codeSampleLiquid: {
          esModule: [''],
          commonJS: [''],
          curl: [''],
          response: ``
        },
        codeSampleBisq: {
          esModule: ['0', '1'],
          commonJS: ['0', '1'],
          curl: ['0', '1'],
          response: `[
  {
    height: 698771,
    time: 1630636953000,
    hash: "0000000000000000000a33c6ac863eee8c76ca72435f25d679609c0949ac9374",
    previousBlockHash: "00000000000000000001e4184639e5600d3fb4c4e06c2a625e76804c4bc93cb1",
    txs: []
  }
]`
        },
      },
      feeMempoolBlocks: {
        codeTemplate: {
          curl: `/api/fees/mempool-blocks`,
          commonJS: `
        const { %{0}: { fees } } = mempoolJS();

        const feesMempoolBlocks = await fees.getFeesMempoolBlocks();

        document.getElementById("result").textContent = JSON.stringify(feesMempoolBlocks, undefined, 2);
        `,
          esModule: `
  const { %{0}: { fees } } = mempoolJS();

  const feesMempoolBlocks = await fees.getFeesMempoolBlocks();
  console.log(feesMempoolBlocks);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `[
  {
    blockSize: 873046,
    blockVSize: 746096.5,
    nTx: 863,
    totalFees: 8875608,
    medianFee: 10.79646017699115,
    feeRange: [
      1,
      2.4242424242424243,
      8.107816711590296,
      10.148014440433213,
      11.053311793214863,
      12.041811846689896,
      14.930957683741648,
      302.11480362537765
    ]
  }
]`
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `[
  {
    blockSize: 2871,
    blockVSize: 2377.5,
    nTx: 11,
    totalFees: 3499,
    medianFee: 1.1799410029498525,
    feeRange: [
      1.00374531835206,
      1.00374531835206,
      1.0046860356138707,
      1.1799410029498525,
      1.183431952662722,
      1.3274336283185841,
      1.3995037220843674,
      5.0271041369472185
    ]
  }
]`
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `[
  {
    blockSize: 16157,
    blockVSize: 10338.5,
    nTx: 75,
    totalFees: 13493,
    medianFee: 1.304812834224599,
    feeRange: [
      1.304812834224599,
      1.304812834224599,
      1.304812834224599,
      1.304812834224599,
      1.304812834224599,
      1.304812834224599,
      1.304812834224599,
      1.3123359580052494
    ]
  }
]`
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `[
  {
    blockSize: 5011,
    blockVSize: 1530.25,
    nTx: 1,
    totalFees: 288,
    medianFee: 0.1882045417415455,
    feeRange: [
      0.1882045417415455,
      0.1882045417415455,
      0.1882045417415455,
      0.1882045417415455,
      0.1882045417415455,
      0.1882045417415455,
      0.1882045417415455,
      0.1882045417415455
    ]
  }
]`
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
      },
      feeRecommended: {
        codeTemplate: {
          curl: `/api/fees/recommended`,
          commonJS: `
        const { %{0}: { fees } } = mempoolJS();

        const feesRecommended = await fees.getFeesRecommended();

        document.getElementById("result").textContent = JSON.stringify(feesRecommended, undefined, 2);
        `,
          esModule: `
  const { %{0}: { fees } } = mempoolJS();

  const feesRecommended = await fees.getFeesRecommended();
  console.log(feesRecommended);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `{
  fastestFee: 1,
  halfHourFee: 1,
  hourFee: 1,
  minimumFee: 1
}`
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `{
  fastestFee: 1,
  halfHourFee: 1,
  hourFee: 1,
  minimumFee: 1
}`
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `{
  fastestFee: 1,
  halfHourFee: 1,
  hourFee: 1,
  minimumFee: 1
}`
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `{
  fastestFee: 0.1,
  halfHourFee: 0.1,
  hourFee: 0.1,
  minimumFee: 1
}`
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
      },
      mempool: {
        codeTemplate: {
          curl: `/api/mempool`,
          commonJS: `
        const { %{0}: { mempool } } = mempoolJS();

        const getMempool = await mempool.getMempool();

        document.getElementById("result").textContent = JSON.stringify(getMempool, undefined, 2);
        `,
          esModule: `
  const { %{0}: { mempool } } = mempoolJS();

  const getMempool = await mempool.getMempool();
  console.log(getMempool);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `{
  count: 3169,
  vsize: 1891542,
  total_fee: 20317481,
  fee_histogram: []
}`
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `{
  count: 16,
  vsize: 2692,
  total_fee: 46318,
  fee_histogram: [
    [
      1.0071429,
      2692
    ]
  ]
}`
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `{
  count: 58,
  vsize: 8008,
  total_fee: 10407,
  fee_histogram: [
    [
      1,
      8008
    ]
  ]
}`
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `{
  count: 0,
  vsize: 0,
  total_fee: 0,
  fee_histogram: [ ]
}`
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
      },
      mempoolTxs: {
        codeTemplate: {
          curl: `/api/mempool/txids`,
          commonJS: `
        const { %{0}: { mempool } } = mempoolJS();

        const getMempoolTxids = await mempool.getMempoolTxids();

        document.getElementById("result").textContent = JSON.stringify(getMempoolTxids, undefined, 2);
        `,
          esModule: `
  const { %{0}: { mempool } } = mempoolJS();

  const getMempoolTxids = await mempool.getMempoolTxids();
  console.log(getMempoolTxids);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `[
  "65b04c4618999a221e8b66943a17c216172a9c865f49c88b76de81212b24bf01",
  "4a3ebe804f273b4c7a96e63f6b963e812ef7e6e0e8381c2d662715bcf5bfa846",
  "1ef9df26fab649183b591d148011ce809756f9cd9e6be3d383e80808b1929724",
  ...
]`
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `[
  "af04a3e8b7bd49217165435e2717b6ed977cde9c0f6f2a5813c4c39eb53748af",
  "d4c4989617e9af40518f7846f98e98e4a187bc29fb95542c9aa469af159c61e4",
  "c4c0630b18e910be0a70ebd5d4897b379168b0f357a6536188a28e38d2cf8b43",
  "c6c9c44ca17ff8c1ebfe27978e57277be6098f0fb5129840370c013fe503db24",
  ...
]`
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `[
  "ddd40341cfa1268801407e9ff43da020cab03f8bf1b422239da0652a4496367e",
  "7fe571957cf61c41598e2acb54211be32cd13df2b71b1612af1d860bbfb5ee9f",
  "b7cd3be4de533db392bb5bd8aaedd8b25607514502c60c0c6d54358931a6d95f",
  "7786de8ee4fe0b11410658866800b90e5a798e3721dd6031c6b5094474bd80c1",
  ...
]`
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `[
  "f3f3acdaa6a823efcbbbbcc607ec4d1c2c40d618135ec09d8ed96e4d9b37db38"
]`
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
      },
      mempoolRecent: {
        codeTemplate: {
          curl: `/api/mempool/recent`,
          commonJS: `
        const { %{0}: { mempool } } = mempoolJS();

        const getMempoolRecent = await mempool.getMempoolRecent();

        document.getElementById("result").textContent = JSON.stringify(getMempoolRecent, undefined, 2);
        `,
          esModule: `
  const { %{0}: { mempool } } = mempoolJS();

  const getMempoolRecent = await mempool.getMempoolRecent();
  console.log(getMempoolRecent);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `[
  {
    txid: "4b93c138293a7e3dfea6f0a63d944890b5ba571b03cc22d8c66995535e90dce8",
    fee: 18277,
    vsize: 2585,
    value: 4972029
  },
  ...
]`
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `[
  {
    txid: "1fc5098fe3378828a890fa5144883cdd1411d9cdbb1af365c20e72503b11dc81",
    fee: 221,
    vsize: 201,
    value: 944960
  },
  ...
]`
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `[
  {
    txid: "18dcbd5405f65f583ed32db2f86f84510c07c59ac5321bb90cbd3a3f2963c224",
    fee: 183,
    vsize: 140,
    value: 4369990908
  },
  ...
]`
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `[
  {
    txid: "06428bf0f6dc6a55e1d800afcd4697d1cdee4debbfaa7fd782d747a80d051c25",
    fee: 251,
    vsize: 2515
  },
  ...
]`
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
      },
      transactionCpfp: {
        codeTemplate: {
          curl: `/api/fees/cpfp/%{1}`,
          commonJS: `
        const { %{0}: { fees } } = mempoolJS();

        const txid = 'txid';
        const feesCPFP = await fees.getCPFP({ txid });

        document.getElementById("result").textContent = JSON.stringify(feesCPFP, undefined, 2);
        `,
          esModule: `
  const { %{0}: { fees } } = mempoolJS();

  const txid = 'txid';
  const feesCPFP = await fees.getCPFP({ txid });
  console.log(feesCPFP);
          `,
        },
        codeSampleMainnet: {
          esModule: ['txid'],
          commonJS: ['txid'],
          curl: ['txid'],
          response: ``
        },
        codeSampleTestnet: {
          esModule: ['txid'],
          commonJS: ['txid'],
          curl: ['txid'],
          response: ``
        },
        codeSampleSignet: {
          esModule: ['txid'],
          commonJS: ['txid'],
          curl: ['txid'],
          response: ``
        },
        codeSampleLiquid: {
          esModule: ['txid'],
          commonJS: ['txid'],
          curl: ['txid'],
          response: ``
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
      },
      transaction: {
        codeTemplate: {
          curl: `/api/tx/%{1}`,
          commonJS: `
        const { %{0}: { transactions } } = mempoolJS();

        const txid = '%{1}';
        const tx = await transactions.getTx({ txid });

        document.getElementById("result").textContent = JSON.stringify(tx, undefined, 2);
        `,
          esModule: `
  const { %{0}: { transactions } } = mempoolJS();

  const txid = '%{1}';
  const tx = await transactions.getTx({ txid });
  console.log(tx);
          `,
        },
        codeSampleMainnet: {
          esModule: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          commonJS: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          curl: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          response: `{
  txid: "15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521",
  version: 1,
  locktime: 0,
  vin: [],
  vout: [],
  size: 884,
  weight: 3536,
  fee: 20000,
  status: {
    confirmed: true,
    block_height: 363348,
    block_hash: "0000000000000000139385d7aa78ffb45469e0c715b8d6ea6cb2ffa98acc7171",
    block_time: 1435754650
  }
}`
        },
        codeSampleTestnet: {
          esModule: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          commonJS: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          curl: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          response: `{
  txid: "eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d",
  version: 2,
  locktime: 2091198,
  vin: [],
  vout: [],
  size: 222,
  weight: 561,
  fee: 16332,
  status: {
    confirmed: true,
    block_height: 2091199,
    block_hash: "000000000000004d36632fda8180ff16855d606e5515aab0750d9d4fe55fe7d6",
    block_time: 1630648992
  }
}`
        },
        codeSampleSignet: {
          esModule: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          commonJS: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          curl: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          response: `{
  txid: "fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025",
  version: 2,
  locktime: 0,
  vin: [],
  vout: [],
  size: 99,
  weight: 381,
  fee: 125,
  status: {
    confirmed: true,
    block_height: 53788,
    block_hash: "0000012a49f15fdbec49f647800d26dabc4027ade9739f398f618d167128b225",
    block_time: 1630648988
  }
}`
        },
        codeSampleLiquid: {
          esModule: [`801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a`],
          commonJS: [`801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a`],
          curl: [`801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a`],
          response: `{
  txid: "801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a",
  version: 2,
  locktime: 1472364,
  vin: [],
  vout: [],
  size: 4599,
  weight: 5325,
  fee: 529,
  status: {
    confirmed: true,
    block_height: 1472366,
    block_hash: "8422f44e62d7349f8c54c3d353290a8edea1532898e6dc832902bf7ef396e7c1",
    block_time: 1630649218
  }
}`,
        },
        codeSampleBisq: {
          esModule: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          commonJS: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          curl: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          response: `{
  txid: "98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e",
  version: 1,
  locktime: 0,
  vin: [],
  vout: [],
  size: 402,
  weight: 957,
  fee: 2390,
  status: {
    confirmed: true,
    block_height: 698788,
    block_hash: "00000000000000000005bfe17b41395bed53565022e0c98965b15ec1d00b1f31",
    block_time: 1630645738
  }
}`,
        },
      },
      transactionHex: {
        codeTemplate: {
          curl: `/api/tx/%{1}/hex`,
          commonJS: `
        const { %{0}: { transactions } } = mempoolJS();

        const txid = '%{1}';
        const txHex = await transactions.getTxHex({ txid });

        document.getElementById("result").textContent = JSON.stringify(txHex, undefined, 2);
        `,
          esModule: `
  const { %{0}: { transactions } } = mempoolJS();

  const txid = '%{1}';
  const txHex = await transactions.getTxHex({ txid });
  console.log(txHex);
          `,
        },
        codeSampleMainnet: {
          esModule: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          commonJS: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          curl: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          response: `010000000536a007284bd52ee826680a7f43536472f1bcce1e76cd76b826b88c5884eddf1f0c0000006b483045022100bcdf40fb3b5ebfa2c158ac8d1a41c03eb3dba4e180b00e81836bafd56d946efd022005cc40e35022b614275c1e485c409599667cbd41f6e5d78f421cb260a020a24f01210255ea3f53ce3ed1ad2c08dfc23b211b15b852afb819492a9a0f3f99e5747cb5f0ffffffffee08cb90c4e84dd7952b2cfad81ed3b088f5b...`
        },
        codeSampleTestnet: {
          esModule: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          commonJS: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          curl: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          response: `0200000000010146c398e70cceaf9d8f734e603bc53e4c4c0605ab46cb1b5807a62c90f5aed50d0100000000feffffff023c0fc10c010000001600145033f65b590f2065fe55414213f1d25ab20b6c4f487d1700000000001600144b812d5ef41fc433654d186463d41b458821ff740247304402202438dc18801919baa64eb18f7e925a...`
        },
        codeSampleSignet: {
          esModule: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          commonJS: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          curl: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          response: `02000000000101b7913f140f19850975352064a7ccfd7e96e1ed9a847c463309839a37c9d01e530000000000ffffffff017d65a61d000000002200204ae81572f06e1b88fd5ced7a1a000945432e83e1551e6f721ee9c00b8cc3326001015100000000`
        },
        codeSampleLiquid: {
          esModule: [`801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a`],
          commonJS: [`801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a`],
          curl: [`801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a`],
          response: `020000000101730fb6b65e115f4ec15690b3539311becd3ef8d1ed4c2b7e53ec3934b4254f65010000001716001436b178e63ed841263f7b82a97d2e783791394432feffffff020b5ff1f5c8059fc270bdeb196c5f38e3da2de8fd9034c34427b70fa66d2f388efe083745b65e4c6e029b020d74df709c5842737c4d50873ef4ec8e0579a3c41f09130274bf768af8b1c462b1e5b7ffb1bb496a019a0ed090e4ce26283a946542280c6f17a...`,
        },
        codeSampleBisq: {
          esModule: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          commonJS: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          curl: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          response: `0100000000010222ae3642a9300262f6e730e8bfb7979b15852c8836f3835beef9cd58c464e5f70000000000ffffffff22ae3642a9300262f6e730e8bfb7979b15852c8836f3835beef9cd58c464e5f70200000000ffffffff03de0900000000000016001490f9ee145d7b1c9352b793350741da97f3e4d795aca80500000000001600144168859b4b74a09277969fb8152115aea9d33a159c960600000000001600146534b1859209d8ae8f1a8...`,
        },
      },
      transactionMerkleBlockProof: {
        codeTemplate: {
          curl: `/api/tx/%{1}/merkleblock-proof`,
          commonJS: `
        const { %{0}: { transactions } } = mempoolJS();

        const txid = '%{1}';
        const txMerkleBlockProof = await transactions.getTxMerkleBlockProof({ txid });

        document.getElementById("result").textContent = JSON.stringify(txMerkleBlockProof, undefined, 2);
        `,
          esModule: `
  const { %{0}: { transactions } } = mempoolJS();

  const txid = '%{1}';
  const txMerkleBlockProof = await transactions.getTxMerkleBlockProof({ txid });
  console.log(txMerkleBlockProof);
          `,
        },
        codeSampleMainnet: {
          esModule: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          commonJS: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          curl: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          response: `0300000058f6dd09ac5aea942c01d12e75b351e73f4304cc442741000000000000000000ef0c2fa8517414b742094a020da7eba891b47d660ef66f126ad01e5be99a2fd09ae093558e411618c14240df820700000ce4d15e17594f257b22d1ddf47d07b3b88779a8374fcd515ad883d79726c6027da6abfcbc1341a049b30277d3bf14e4663...`
        },
        codeSampleTestnet: {
          esModule: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          commonJS: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          curl: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          response: `0000602002bf77bbb098f90f149430c314e71ef4e2671ea5e04a2503e0000000000000000406ffb54f2925360aae81bd3199f456928bbe6ae83a877902da9d9ffb08215da0ba3161ffff001a545a850bb80000000906e0c62f68fdf4865a46889e2e12d66f03cc537225d612aa77b08a38936b4d435d73544598d93174314d75e5833...`
        },
        codeSampleSignet: {
          esModule: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          commonJS: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          curl: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          response: `00000020d356e0a14120d45653120a7bd53280ffce2aa2ced301682a1f2867687f000000298ef149a1675866dbdde315b22c24c63fd7670fdc5b86b588007fa187fa85089cba31619356011eaedd8800180000000656e9b938241cb350316cd9155167f3bce7370aa1095143c304ef7a44da4984e02550c48f3e01648dd65f5e3e290432c...`
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``,
        },
        codeSampleBisq: {
          esModule: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          commonJS: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          curl: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          response: `04000020e05c5f176bdb7966b44388ca223bef6e548fb390a9f202000000000000000000f10d5017f8e98200ea6e9d9a90d48e8078a49f2ee1da2cae9f80f48a0badfdaaeaad3161a0fa0f174d163a5daa0400000c77d2b87749e72de52feacaab57134c40172ae247c9de1f8f180736a8ef64a024542ab6b22b2c1fc961eae3d7d7d6c5f...`,
        },
      },
      transactionMerkleProof: {
        codeTemplate: {
          curl: `/api/tx/%{1}/merkle-proof`,
          commonJS: `
        const { %{0}: { transactions } } = mempoolJS();

        const txid = '%{1}';
        const txMerkleProof = await transactions.getTxMerkleProof({ txid });

        document.getElementById("result").textContent = JSON.stringify(txMerkleProof, undefined, 2);
        `,
          esModule: `
  const { %{0}: { transactions } } = mempoolJS();

  const txid = '%{1}';
  const txMerkleProof = await transactions.getTxMerkleProof({ txid });
  console.log(txMerkleProof);
          `,
        },
        codeSampleMainnet: {
          esModule: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          commonJS: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          curl: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          response: `{
  block_height: 363348,
  merkle: [
    "acf931fe8980c6165b32fe7a8d25f779af7870a638599db1977d5309e24d2478",
    "ee25997c2520236892c6a67402650e6b721899869dcf6715294e98c0b45623f9",
    "790889ac7c0f7727715a7c1f1e8b05b407c4be3bd304f88c8b5b05ed4c0c24b7",
    "facfd99cc4cfe45e66601b37a9637e17fb2a69947b1f8dc3118ed7a50ba7c901",
    "8c871dd0b7915a114f274c354d8b6c12c689b99851edc55d29811449a6792ab7",
    "eb4d9605966b26cfa3bf69b1afebe375d3d6aadaa7f2899d48899b6bd2fd6a43",
    "daa1dc59f22a8601b489fc8a89da78bc35415291c62c185e711b8eef341e6e70",
    "102907c1b95874e2893c6f7f06b45a3d52455d3bb17796e761df75aeda6aa065",
    "baeede9b8e022bb98b63cb765ba5ca3e66e414bfd37702b349a04113bcfcaba6",
    "b6f07be94b55144588b33ff39fb8a08004baa03eb7ff121e1847d715d0da6590",
    "7d02c62697d783d85a51cd4f37a87987b8b3077df4ddd1227b254f59175ed1e4"
  ],
  pos: 1465
}`
        },
        codeSampleTestnet: {
          esModule: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          commonJS: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          curl: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          response: `{
  block_height: 2091199,
  merkle: [
    "434d6b93388ab077aa12d6257253cc036fd6122e9e88465a86f4fd682fc6e006",
    "bd9af28e56cf6731e78ee1503a65d9cc9b15c148daa474e71e085176f48996ac",
    "605f6f83423ef3b86623927ef2d9dcb0f8d9e40a8132217c2fa0910b84488ec7",
    "10b7ef06ef0756823dbf39dea717be397e7ccb49bbefc5cfc45e6f9d58793baf",
    "19183ceae11796a9b1d0893e0561870bbce4d060c9547b1e91ad8b34eb3d5001",
    "1b16723739522955422b4286b4d8620d2a704b6997e6bbd809d151b8d8d64611",
    "6f8496469b19dd35871684332dfd3fc0205d83d2c58c44ebdae068542bc951f6",
    "e0d2733bd7bce4e5690b71bc8f7cedb1edbc49a5ff85c3678ecdec894ea1c023"
  ],
  pos: 1
}`
        },
        codeSampleSignet: {
          esModule: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          commonJS: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          curl: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          response: `{
  block_height: 53788,
  merkle: [
    "e08449da447aef04c3435109a10a37e7bcf3675115d96c3150b31c2438b9e956",
    "027699486d6cc71669bbc8168632101ed95266dcd02fa8b757830d570ef54d15",
    "62458b115b3db7e9dafecb37de1fcb985891bc77a323018811b6d0392e3705a6",
    "3a32287eccca335a3dac6aede77855a78faed4060d16bb89517da9816a763cb4",
    "76a86eb801f1884b99389af3cd41a7994679c3f93c53f9fcf0505ab1340b329f"
  ],
  pos: 1
}`
        },
        codeSampleLiquid: {
          esModule: ['801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a'],
          commonJS: ['801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a'],
          curl: ['801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a'],
          response: `{
  block_height: 1472366,
  merkle: [
    "ce1903e0a8a5e17c6267cf3397d42011611eb26aa7b65fd73b9851b71da3fc66",
    "377158243ad98ae874cc624e39f7da10d7072e2cbb5229c33cc0bee0bfb6eb4e"
  ],
  pos: 1
}`,
        },
        codeSampleBisq: {
          esModule: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          commonJS: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          curl: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          response: `{
  block_height: 698788,
  merkle: [
    "455eb8942edf5444f0130194353185705e891fb328b47fd5c43c0f5260de8121",
    "98d18cb3470a3ee27a1d083e8f7baf76eaed19b5c972af33a335acdb3374dc75",
    "1bf53a838bef7d64c2f7207bdb054df7dcc58e335ba9bd43803d00a24b4aec1b",
    "19033925798e6e09f385dd7b5afbd76136f910b21b75ca03a2692ee804e0860e",
    "5b4bd0b3cbbd5b73ae36d00bd144ee8db0966ff1f78c4483a4a8d601dc0b2ded",
    "485a0c2af1687efe5433d4621c5dd222f6c5d6d7d7e3ea61c91f2c2bb2b62a54",
    "1af9cbc4539b66e44c9bd6d07c5720301ba4694088e06b7f5978686b7a94aa62",
    "b7a27d5a849f30cdf82c19b3d84902a146a0723a0798e46f91028f412af0d14d",
    "b3925e68565674c54b3f0beb9f5f3820f4cd35cd15683b119cd232f52024a997",
    "24a064efa83607188f1fdec947e22a17404c1357abcaea2fe52de74977b8d277",
    "bd818bb2791a0d536097163c0d4dfb4dc3657cbd169617ca286dcc828ddf444d"
  ],
  pos: 546
}`,
        },
      },
      transactionOutspend: {
        codeTemplate: {
          curl: `/api/tx/%{1}/outspend/%{2}`,
          commonJS: `
        const { %{0}: { transactions } } = mempoolJS();

        const txid = '%{1}';
        const txOutspend = await transactions.getTxOutspend({
          txid,
          vout: %{2},
        });

        document.getElementById("result").textContent = JSON.stringify(txOutspend, undefined, 2);
        `,
          esModule: `
  const { %{0}: { transactions } } = mempoolJS();

  const txid = '%{1}';
  const txOutspend = await transactions.getTxOutspend({
    txid,
    vout: %{2},
  });
  console.log(txOutspend);
          `,
        },
        codeSampleMainnet: {
          esModule: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521', '3'],
          commonJS: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521', '3'],
          curl: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521', '3'],
          response: `{
  spent: true,
  txid: "2a1b8ec06d68096911da82b02806c3848c415b0044a0046850c4a97cbffac7b1",
  vin: 1,
  status: {
    confirmed: true,
    block_height: 363354,
    block_hash: "000000000000000012e6130dec174ca877bf39ead6e3d04a8ba3b0cd683c1661",
    block_time: 1435758032
  }
}`
        },
        codeSampleTestnet: {
          esModule: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d', '0'],
          commonJS: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d', '0'],
          curl: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d', '0'],
          response: `{
  spent: true,
  txid: "37e867526abb7cde3f64f86f60b42bee1f989aa8514730ae2e741dd05bbc286b",
  vin: 0,
  status: {
    confirmed: true,
    block_height: 2091199,
    block_hash: "000000000000004d36632fda8180ff16855d606e5515aab0750d9d4fe55fe7d6",
    block_time: 1630648992
  }
}`
        },
        codeSampleSignet: {
          esModule: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025', '0'],
          commonJS: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025', '0'],
          curl: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025', '0'],
          response: `{
  spent: true,
  txid: "ad9cb0f6770219f0a2325d77466d30ff2ddd18b0f7f68b1deb547c4b3b972623",
  vin: 0,
  status: {
    confirmed: true,
    block_height: 53789,
    block_hash: "000000372e6b34e56866b4e4c75a372454e956bc42f6760b1b119bfa5ce58223",
    block_time: 1630649351
  }
}`
        },
        codeSampleLiquid: {
          esModule: ['801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a', '0'],
          commonJS: ['801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a', '0'],
          curl: ['801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a', '0'],
          response: `{
  spent: true,
  txid: "c02e132181dfc5f65ea16eadf53b346915b9f3937179c49e209b995e57c319c2",
  vin: 0,
  status: {
    confirmed: true,
    block_height: 1472368,
    block_hash: "a07de4ccbb212ea203c455dde477069fb6ed6120fc96c78402fa9d129efa31ff",
    block_time: 1630649338
  }
}`,
        },
        codeSampleBisq: {
          esModule: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`, '1'],
          commonJS: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`, '1'],
          curl: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`, '1'],
          response: `{
  spent: true,
  txid: "455eb8942edf5444f0130194353185705e891fb328b47fd5c43c0f5260de8121",
  vin: 0,
  status: {
    confirmed: true,
    block_height: 698788,
    block_hash: "00000000000000000005bfe17b41395bed53565022e0c98965b15ec1d00b1f31",
    block_time: 1630645738
  }
}`,
        },
      },
      transactionOutspends: {
        codeTemplate: {
          curl: `/api/tx/%{1}/outspends`,
          commonJS: `
        const { %{0}: { transactions } } = mempoolJS();

        const txid = '%{1}';
        const txOutspends = await transactions.getTxOutspends({ txid });
        document.getElementById("result").textContent = JSON.stringify(txOutspends, undefined, 2);
        `,
          esModule: `
  const { %{0}: { transactions } } = mempoolJS();

  const txid = '%{1}';
  const txOutspends = await transactions.getTxOutspends({ txid });

  console.log(txOutspends);
          `,
        },
        codeSampleMainnet: {
          esModule: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          commonJS: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          curl: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          response: `[
  {
    spent: true,
    txid: "34de8ba520eb846da8831fa47c06eef9b4eb4a2ff6a3271165fd6b9aafc5a20c",
    vin: 12,
    status: {
      confirmed: true,
      block_height: 363349,
      block_hash: "000000000000000012ad81b3ea2cb1c4ba115901bd1b41cd05a6a8d736691322",
      block_time: 1435754897
    }
  },
  ...
]`
        },
        codeSampleTestnet: {
          esModule: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          commonJS: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          curl: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          response: `[
  {
    spent: true,
    txid: "37e867526abb7cde3f64f86f60b42bee1f989aa8514730ae2e741dd05bbc286b",
    vin: 0,
    status: {
      confirmed: true,
      block_height: 2091199,
      block_hash: "000000000000004d36632fda8180ff16855d606e5515aab0750d9d4fe55fe7d6",
      block_time: 1630648992
    }
  },
  {
    spent: false
  }
]`
        },
        codeSampleSignet: {
          esModule: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          commonJS: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          curl: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          response: `[
  {
    spent: true,
    txid: "ad9cb0f6770219f0a2325d77466d30ff2ddd18b0f7f68b1deb547c4b3b972623",
    vin: 0,
    status: {
      confirmed: true,
      block_height: 53789,
      block_hash: "000000372e6b34e56866b4e4c75a372454e956bc42f6760b1b119bfa5ce58223",
      block_time: 1630649351
    }
  }
]`
        },
        codeSampleLiquid: {
          esModule: ['801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a'],
          commonJS: ['801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a'],
          curl: ['801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a'],
          response: `{
  spent: true,
  txid: "c02e132181dfc5f65ea16eadf53b346915b9f3937179c49e209b995e57c319c2",
  vin: 0,
  status: {
    confirmed: true,
    block_height: 1472368,
    block_hash: "a07de4ccbb212ea203c455dde477069fb6ed6120fc96c78402fa9d129efa31ff",
    block_time: 1630649338
  }
}`,
        },
        codeSampleBisq: {
          esModule: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          commonJS: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          curl: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          response: `[
  {
    spent: false
  },
  {
    spent: true,
    txid: "455eb8942edf5444f0130194353185705e891fb328b47fd5c43c0f5260de8121",
    vin: 0,
    status: {
      confirmed: true,
      block_height: 698788,
      block_hash: "00000000000000000005bfe17b41395bed53565022e0c98965b15ec1d00b1f31",
      block_time: 1630645738
    }
  },
  {
    spent: false
  }
]`,
        },
      },
      transactionRaw: {
        codeTemplate: {
          curl: `/api/tx/%{1}/raw`,
          commonJS: `
        const { %{0}: { transactions } } = mempoolJS();

        const txid = '%{1}';
        const txRaw = await transactions.getTxRaw({ txid });

        document.getElementById("result").textContent = JSON.stringify(txRaw, undefined, 2);
        `,
          esModule: `
  const { %{0}: { transactions } } = mempoolJS();

  const txid = '%{1}';
  const txRaw = await transactions.getTxRaw({ txid });
  console.log(txRaw);
          `,
        },
        codeSampleMainnet: {
          esModule: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          commonJS: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          curl: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          response: ``
        },
        codeSampleTestnet: {
          esModule: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          commonJS: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          curl: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          response: ``
        },
        codeSampleSignet: {
          esModule: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          commonJS: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          curl: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          response: ``
        },
        codeSampleLiquid: {
          esModule: ['801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a'],
          commonJS: ['801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a'],
          curl: ['801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a'],
          response: ``,
        },
        codeSampleBisq: {
          esModule: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          commonJS: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          curl: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          response: ``,
        },
      },
      transactionStatus: {
        codeTemplate: {
          curl: `/api/tx/%{1}/status`,
          commonJS: `
        const { %{0}: { transactions } } = mempoolJS();

        const txid = '%{1}';
        const txStatus = await transactions.getTxStatus({ txid });

        document.getElementById("result").textContent = JSON.stringify(txStatus, undefined, 2);
        `,
          esModule: `
  const { %{0}: { transactions } } = mempoolJS();

  const txid = '%{1}';
  const txStatus = await transactions.getTxStatus({ txid });
  console.log(txStatus);
          `,
        },
        codeSampleMainnet: {
          esModule: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          commonJS: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          curl: ['15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521'],
          response: `{
  confirmed: true,
  block_height: 363348,
  block_hash: "0000000000000000139385d7aa78ffb45469e0c715b8d6ea6cb2ffa98acc7171",
  block_time: 1435754650
}`
        },
        codeSampleTestnet: {
          esModule: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          commonJS: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          curl: ['eefbafa4006e77099db059eebe14687965813283e5754d317431d9984554735d'],
          response: `{
  confirmed: false
}`
        },
        codeSampleSignet: {
          esModule: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          commonJS: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          curl: ['fe80c0c2439d41d301f35570018b4239ca3204293e5e5fd68d64013e8fc45025'],
          response: `{
  confirmed: true,
  block_height: 53788,
  block_hash: "0000012a49f15fdbec49f647800d26dabc4027ade9739f398f618d167128b225",
  block_time: 1630648988
}`
        },
        codeSampleLiquid: {
          esModule: ['801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a'],
          commonJS: ['801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a'],
          curl: ['801c8cccdfb1cac41f97d290e00e3e608753bb5b8fbc5ba39f3ab6feef13dd4a'],
          response: `{
  confirmed: true,
  block_height: 1472366,
  block_hash: "8422f44e62d7349f8c54c3d353290a8edea1532898e6dc832902bf7ef396e7c1",
  block_time: 1630649218
}`,
        },
        codeSampleBisq: {
          esModule: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          commonJS: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          curl: [`98a598aeea121ea061dc713d1547363358974191c257d3b563bbf2a1706ff44e`],
          response: `{
  confirmed: true,
  block_height: 698788,
  block_hash: "00000000000000000005bfe17b41395bed53565022e0c98965b15ec1d00b1f31",
  block_time: 1630645738
}`,
        },
      },
      transactionsBisq: {
        codeTemplate: {
          curl: `/api/txs/%{1}/%{2}`,
          commonJS: `
        const { %{0}: { transactions } } = mempoolJS();

        const txs = await transactions.getTxs({ index: %{1}, length: %{2} });

        document.getElementById("result").textContent = JSON.stringify(txs, undefined, 2);
        `,
          esModule: `
  const { %{0}: { transactions } } = mempoolJS();

  const txs = await transactions.getTxs({ index: %{1}, length: %{2} });
  console.log(txStatus);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``,
        },
        codeSampleBisq: {
          esModule: [`0`, '1'],
          commonJS: [`0`, '1'],
          curl: [`0`, '1'],
          response: `[
  {
    txVersion: "1",
    id: "be1b2932155c012bec79bbd0f7cf7db32a4a35859dcb7b70f5d35fea581ac30a",
    blockHeight: 698808,
    blockHash: "0000000000000000000bf9461e8e0b8e077bcc0e8fe0f55483a7fd5d0860336c",
    time: 1630658066000,
    inputs: [],
    outputs: [],
    txType: "PAY_TRADE_FEE",
    txTypeDisplayString: "Pay trade fee",
    burntFee: 609,
    invalidatedBsq: 0,
    unlockBlockHeight: 0
  }
]`,
        },
      },
      transactionPost: {
        codeTemplate: {
          curl: `%{1}" "${this.hostname}${this.baseNetworkUrl}/api/tx`,
          commonJS: `
        const { %{0}: { transactions } } = mempoolJS();

        const txHex = '%{1}';

        const txid = await transactions.postTx({ txHex });

        document.getElementById("result").textContent = JSON.stringify(txid, undefined, 2);
        `,
          esModule: `
  const { %{0}: { transactions } } = mempoolJS();

  const txHex = '%{1}';

  const txid = await transactions.postTx({ txHex });
  console.log(txid);
          `,
        },
        codeSampleMainnet: {
          esModule: ['0200000001fd5b5fcd1cb066c27cfc9fda5428b9be850b81ac440ea51f1ddba2f987189ac1010000008a4730440220686a40e9d2dbffeab4ca1ff66341d06a17806767f12a1fc4f55740a7af24c6b5022049dd3c9a85ac6c51fecd5f4baff7782a518781bbdd94453c8383755e24ba755c01410436d554adf4a3eb03a317c77aa4020a7bba62999df633bba0ea8f83f48b9e01b0861d3b3c796840f982ee6b14c3c4b7ad04fcfcc3774f81bff9aaf52a15751fedfdffffff02416c00000000000017a914bc791b2afdfe1e1b5650864a9297b20d74c61f4787d71d0000000000001976a9140a59837ccd4df25adc31cdad39be6a8d97557ed688ac00000000'],
          commonJS: ['0200000001fd5b5fcd1cb066c27cfc9fda5428b9be850b81ac440ea51f1ddba2f987189ac1010000008a4730440220686a40e9d2dbffeab4ca1ff66341d06a17806767f12a1fc4f55740a7af24c6b5022049dd3c9a85ac6c51fecd5f4baff7782a518781bbdd94453c8383755e24ba755c01410436d554adf4a3eb03a317c77aa4020a7bba62999df633bba0ea8f83f48b9e01b0861d3b3c796840f982ee6b14c3c4b7ad04fcfcc3774f81bff9aaf52a15751fedfdffffff02416c00000000000017a914bc791b2afdfe1e1b5650864a9297b20d74c61f4787d71d0000000000001976a9140a59837ccd4df25adc31cdad39be6a8d97557ed688ac00000000'],
          curl: ['0200000001fd5b5fcd1cb066c27cfc9fda5428b9be850b81ac440ea51f1ddba2f987189ac1010000008a4730440220686a40e9d2dbffeab4ca1ff66341d06a17806767f12a1fc4f55740a7af24c6b5022049dd3c9a85ac6c51fecd5f4baff7782a518781bbdd94453c8383755e24ba755c01410436d554adf4a3eb03a317c77aa4020a7bba62999df633bba0ea8f83f48b9e01b0861d3b3c796840f982ee6b14c3c4b7ad04fcfcc3774f81bff9aaf52a15751fedfdffffff02416c00000000000017a914bc791b2afdfe1e1b5650864a9297b20d74c61f4787d71d0000000000001976a9140a59837ccd4df25adc31cdad39be6a8d97557ed688ac00000000'],
          response: ``
        },
        codeSampleTestnet: {
          esModule: ['0200000001fd5b5fcd1cb066c27cfc9fda5428b9be850b81ac440ea51f1ddba2f987189ac1010000008a4730440220686a40e9d2dbffeab4ca1ff66341d06a17806767f12a1fc4f55740a7af24c6b5022049dd3c9a85ac6c51fecd5f4baff7782a518781bbdd94453c8383755e24ba755c01410436d554adf4a3eb03a317c77aa4020a7bba62999df633bba0ea8f83f48b9e01b0861d3b3c796840f982ee6b14c3c4b7ad04fcfcc3774f81bff9aaf52a15751fedfdffffff02416c00000000000017a914bc791b2afdfe1e1b5650864a9297b20d74c61f4787d71d0000000000001976a9140a59837ccd4df25adc31cdad39be6a8d97557ed688ac00000000'],
          commonJS: ['0200000001fd5b5fcd1cb066c27cfc9fda5428b9be850b81ac440ea51f1ddba2f987189ac1010000008a4730440220686a40e9d2dbffeab4ca1ff66341d06a17806767f12a1fc4f55740a7af24c6b5022049dd3c9a85ac6c51fecd5f4baff7782a518781bbdd94453c8383755e24ba755c01410436d554adf4a3eb03a317c77aa4020a7bba62999df633bba0ea8f83f48b9e01b0861d3b3c796840f982ee6b14c3c4b7ad04fcfcc3774f81bff9aaf52a15751fedfdffffff02416c00000000000017a914bc791b2afdfe1e1b5650864a9297b20d74c61f4787d71d0000000000001976a9140a59837ccd4df25adc31cdad39be6a8d97557ed688ac00000000'],
          curl: ['0200000001fd5b5fcd1cb066c27cfc9fda5428b9be850b81ac440ea51f1ddba2f987189ac1010000008a4730440220686a40e9d2dbffeab4ca1ff66341d06a17806767f12a1fc4f55740a7af24c6b5022049dd3c9a85ac6c51fecd5f4baff7782a518781bbdd94453c8383755e24ba755c01410436d554adf4a3eb03a317c77aa4020a7bba62999df633bba0ea8f83f48b9e01b0861d3b3c796840f982ee6b14c3c4b7ad04fcfcc3774f81bff9aaf52a15751fedfdffffff02416c00000000000017a914bc791b2afdfe1e1b5650864a9297b20d74c61f4787d71d0000000000001976a9140a59837ccd4df25adc31cdad39be6a8d97557ed688ac00000000'],
          response: ``
        },
        codeSampleSignet: {
          esModule: ['0200000001fd5b5fcd1cb066c27cfc9fda5428b9be850b81ac440ea51f1ddba2f987189ac1010000008a4730440220686a40e9d2dbffeab4ca1ff66341d06a17806767f12a1fc4f55740a7af24c6b5022049dd3c9a85ac6c51fecd5f4baff7782a518781bbdd94453c8383755e24ba755c01410436d554adf4a3eb03a317c77aa4020a7bba62999df633bba0ea8f83f48b9e01b0861d3b3c796840f982ee6b14c3c4b7ad04fcfcc3774f81bff9aaf52a15751fedfdffffff02416c00000000000017a914bc791b2afdfe1e1b5650864a9297b20d74c61f4787d71d0000000000001976a9140a59837ccd4df25adc31cdad39be6a8d97557ed688ac00000000'],
          commonJS: ['0200000001fd5b5fcd1cb066c27cfc9fda5428b9be850b81ac440ea51f1ddba2f987189ac1010000008a4730440220686a40e9d2dbffeab4ca1ff66341d06a17806767f12a1fc4f55740a7af24c6b5022049dd3c9a85ac6c51fecd5f4baff7782a518781bbdd94453c8383755e24ba755c01410436d554adf4a3eb03a317c77aa4020a7bba62999df633bba0ea8f83f48b9e01b0861d3b3c796840f982ee6b14c3c4b7ad04fcfcc3774f81bff9aaf52a15751fedfdffffff02416c00000000000017a914bc791b2afdfe1e1b5650864a9297b20d74c61f4787d71d0000000000001976a9140a59837ccd4df25adc31cdad39be6a8d97557ed688ac00000000'],
          curl: ['0200000001fd5b5fcd1cb066c27cfc9fda5428b9be850b81ac440ea51f1ddba2f987189ac1010000008a4730440220686a40e9d2dbffeab4ca1ff66341d06a17806767f12a1fc4f55740a7af24c6b5022049dd3c9a85ac6c51fecd5f4baff7782a518781bbdd94453c8383755e24ba755c01410436d554adf4a3eb03a317c77aa4020a7bba62999df633bba0ea8f83f48b9e01b0861d3b3c796840f982ee6b14c3c4b7ad04fcfcc3774f81bff9aaf52a15751fedfdffffff02416c00000000000017a914bc791b2afdfe1e1b5650864a9297b20d74c61f4787d71d0000000000001976a9140a59837ccd4df25adc31cdad39be6a8d97557ed688ac00000000'],
          response: ``
        },
        codeSampleLiquid: {
          esModule: [`0200000001fd5b5fcd1cb066c27cfc9fda5428b9be850b81ac440ea51f1ddba2f987189ac1010000008a4730440220686a40e9d2dbffeab4ca1ff66341d06a17806767f12a1fc4f55740a7af24c6b5022049dd3c9a85ac6c51fecd5f4baff7782a518781bbdd94453c8383755e24ba755c01410436d554adf4a3eb03a317c77aa4020a7bba62999df633bba0ea8f83f48b9e01b0861d3b3c796840f982ee6b14c3c4b7ad04fcfcc3774f81bff9aaf52a15751fedfdffffff02416c00000000000017a914bc791b2afdfe1e1b5650864a9297b20d74c61f4787d71d0000000000001976a9140a59837ccd4df25adc31cdad39be6a8d97557ed688ac00000000`],
          commonJS: [`0200000001fd5b5fcd1cb066c27cfc9fda5428b9be850b81ac440ea51f1ddba2f987189ac1010000008a4730440220686a40e9d2dbffeab4ca1ff66341d06a17806767f12a1fc4f55740a7af24c6b5022049dd3c9a85ac6c51fecd5f4baff7782a518781bbdd94453c8383755e24ba755c01410436d554adf4a3eb03a317c77aa4020a7bba62999df633bba0ea8f83f48b9e01b0861d3b3c796840f982ee6b14c3c4b7ad04fcfcc3774f81bff9aaf52a15751fedfdffffff02416c00000000000017a914bc791b2afdfe1e1b5650864a9297b20d74c61f4787d71d0000000000001976a9140a59837ccd4df25adc31cdad39be6a8d97557ed688ac00000000`],
          curl: [`0200000001fd5b5fcd1cb066c27cfc9fda5428b9be850b81ac440ea51f1ddba2f987189ac1010000008a4730440220686a40e9d2dbffeab4ca1ff66341d06a17806767f12a1fc4f55740a7af24c6b5022049dd3c9a85ac6c51fecd5f4baff7782a518781bbdd94453c8383755e24ba755c01410436d554adf4a3eb03a317c77aa4020a7bba62999df633bba0ea8f83f48b9e01b0861d3b3c796840f982ee6b14c3c4b7ad04fcfcc3774f81bff9aaf52a15751fedfdffffff02416c00000000000017a914bc791b2afdfe1e1b5650864a9297b20d74c61f4787d71d0000000000001976a9140a59837ccd4df25adc31cdad39be6a8d97557ed688ac00000000`],
          response: ``,
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
      },
      marketsCurrencies: {
        codeTemplate: {
          curl: `/api/currencies`,
          commonJS: `
        const { %{0}: { markets } } = mempoolJS();

        const currencies = await markets.getCurrencies();

        document.getElementById("result").textContent = JSON.stringify(currencies, undefined, 2);
        `,
          esModule: `
  const { %{0}: { markets } } = mempoolJS();

  const currencies = await markets.getCurrencies();
  console.log(currencies);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``,
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `{
  BTC: {
    code: 'BTC',
    name: 'Bitcoin',
    precision: 8,
    _type: 'crypto'
  }
  ...
}`,
        },
      },
      marketDepth: {
        codeTemplate: {
          curl: `/api/depth?market=%{1}`,
          commonJS: `
        const { %{0}: { markets } } = mempoolJS();

        const market = "%{1}";

        const depth = await markets.getDepth({ market });

        document.getElementById("result").textContent = JSON.stringify(depth, undefined, 2);
        `,
          esModule: `
  const { %{0}: { markets } } = mempoolJS();

  const market = "%{1}";

  const depth = await markets.getDepth({ market });
  console.log(depth);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``,
        },
        codeSampleBisq: {
          esModule: ['BTC_USD'],
          commonJS: ['BTC_USD'],
          curl: ['BTC_USD'],
          response: `{
  btc_usd: {
    buys: [
      '4.56941560',
      ...
    ],
    sells: [
      '4.54668218',
      ...
    ]
  }
}`,
        },
      },
      marketHloc: {
        codeTemplate: {
          curl: `/api/hloc?market=%{1}`,
          commonJS: `
        const { %{0}: { markets } } = mempoolJS();

        const market = "%{1}";

        const hloc = await markets.getHloc({ market });

        document.getElementById("result").textContent = JSON.stringify(hloc, undefined, 2);
        `,
          esModule: `
  const { %{0}: { markets } } = mempoolJS();

  const market = "%{1}";

  const hloc = await markets.getHloc({ market });
  console.log(hloc);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``,
        },
        codeSampleBisq: {
          esModule: ['BTC_USD'],
          commonJS: ['BTC_USD'],
          curl: ['BTC_USD'],
          response: `[
  {
    period_start: 1609459200,
    open: '30448.18510000',
    close: '45717.81750000',
    high: '77700.00000000',
    low: '27500.00000000',
    avg: '44613.01158471',
    volume_right: '4923536.57150000',
    volume_left: '110.36100000'
  }
  ...
]`,
        },
      },
      markets: {
        codeTemplate: {
          curl: `/api/markets`,
          commonJS: `
        const { %{0}: { markets } } = mempoolJS();

        const allMarkets = await markets.getMarkets();

        document.getElementById("result").textContent = JSON.stringify(allMarkets, undefined, 2);
        `,
          esModule: `
  const { %{0}: { markets } } = mempoolJS();

  const allMarkets = await markets.getMarkets();
  console.log(allMarkets);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``,
        },
        codeSampleBisq: {
          esModule: ['BTC_USD'],
          commonJS: ['BTC_USD'],
          curl: ['BTC_USD'],
          response: `{
    btc_brl: {
      pair: 'btc_brl',
      lname: 'Bitcoin',
      rname: 'Brazilian Real',
      lsymbol: 'BTC',
      rsymbol: 'BRL',
      lprecision: 8,
      rprecision: 2,
      ltype: 'crypto',
      rtype: 'fiat',
      name: 'Bitcoin/Brazilian Real'
    },
    ...
}`,
        },
      },
      marketOffers: {
        codeTemplate: {
          curl: `/api/offers?market=%{1}`,
          commonJS: `
        const { %{0}: { markets } } = mempoolJS();

        const market = "%{1}";

        const offers = await markets.getOffers({ market });

        document.getElementById("result").textContent = JSON.stringify(offers, undefined, 2);
        `,
          esModule: `
  const { %{0}: { markets } } = mempoolJS();

  const market = "%{1}";

  const offers = await markets.getOffers({ market });
  console.log(offers);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``,
        },
        codeSampleBisq: {
          esModule: ['BTC_USD'],
          commonJS: ['BTC_USD'],
          curl: ['BTC_USD'],
          response: `{
  btc_usd: {
    buys: [
      {
        offer_id: "ORHL1BE-0c193d04-be60-4657-ba42-cc172bb4ae5d-172",
        offer_date: 1630207815462,
        direction: "BUY",
        min_amount: "0.00500000",
        amount: "0.01500000",
        price: "50030.24770000",
        volume: "750.45370000",
        payment_method: "AMAZON_GIFT_CARD",
        offer_fee_txid: null
        },
        ...
    ],
    sells: [
      {
        offer_id: "nswiwkre-7676d5e6-e808-4c47-9c51-d5708e465ad5-172",
        offer_date: 1630320354509,
        direction: "SELL",
        min_amount: "0.04170000",
        amount: "0.04170000",
        price: "49534.89880000",
        volume: "2065.60520000",
        payment_method: "CASH_DEPOSIT",
        offer_fee_txid: null
        },
        ...
    ]
  }
}`,
        },
      },
      marketTicker: {
        codeTemplate: {
          curl: `/api/ticker?market=%{1}`,
          commonJS: `
        const { %{0}: { markets } } = mempoolJS();

        const market = "%{1}";

        const ticker = await markets.getTicker({ market });

        document.getElementById("result").textContent = JSON.stringify(ticker, undefined, 2);
        `,
          esModule: `
  const { %{0}: { markets } } = mempoolJS();

  const market = "%{1}";

  const ticker = await markets.getTicker({ market });
  console.log(ticker);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``,
        },
        codeSampleBisq: {
          esModule: ['BTC_USD'],
          commonJS: ['BTC_USD'],
          curl: ['BTC_USD'],
          response: `{
  last: "53923.20570000",
  high: "53923.20570000",
  low: "48137.67410000",
  volume_left: "0.27160000",
  volume_right: "13593.92070000",
  buy: "48118.52400000",
  sell: "49555.63750000"
}`,
        },
      },
      marketTrades: {
        codeTemplate: {
          curl: `/api/trades?market=%{1}&limit=%{2}`,
          commonJS: `
        const { %{0}: { markets } } = mempoolJS();

        const market = "%{1}";

        const trades = await markets.getTrades({ market, limit: %{2} });

        document.getElementById("result").textContent = JSON.stringify(trades, undefined, 2);
        `,
          esModule: `
  const { %{0}: { markets } } = mempoolJS();

  const market = "%{1}";

  const trades = await markets.getTrades({ market, limit: %{2} });
  console.log(trades);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``,
        },
        codeSampleBisq: {
          esModule: ['BTC_USD', '1'],
          commonJS: ['BTC_USD', '1'],
          curl: ['BTC_USD', '1'],
          response: `[
  {
    price: "53923.20570000",
    amount: "0.00500000",
    volume: "269.61600000",
    payment_method: "CLEAR_X_CHANGE",
    trade_date: 1630646161647
  }
]`,
        },
      },
      marketVolumes: {
        codeTemplate: {
          curl: `/api/volumes?markets=%{1}`,
          commonJS: `
        const { %{0}: { markets } } = mempoolJS();

        const market = "%{1}";

        const volumes = await markets.getVolumes({ market });

        document.getElementById("result").textContent = JSON.stringify(volumes, undefined, 2);
        `,
          esModule: `
  const { %{0}: { markets } } = mempoolJS();

  const market = "%{1}";

  const volumes = await markets.getVolumes({ market });
  console.log(volumes);
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``,
        },
        codeSampleBisq: {
          esModule: ['BTC_USD', 'BTC'],
          commonJS: ['BTC_USD', 'BTC'],
          curl: ['BTC_USD', 'BTC'],
          response: `[
  {
    period_start: 1451606400,
    num_trades: 1923,
    volume: "1095.22050000"
  },
  ...
]`,
        },
      },
      websocket: {
        codeTemplate: {
          curl: `/api/v1/ws`,
          commonJS: `
        const { %{0}: { websocket } } = mempoolJS();

        const ws = websocket.initClient({
          options: ['blocks', 'stats', 'mempool-blocks', 'live-2h-chart'],
        });

        ws.addEventListener('message', function incoming({data}) {
          const res = JSON.parse(data.toString());
          if (res.blocks) {
            document.getElementById("result-blocks").textContent = JSON.stringify(res.blocks, undefined, 2);
          }
          if (res.mempoolInfo) {
            document.getElementById("result-mempool-info").textContent = JSON.stringify(res.mempoolInfo, undefined, 2);
          }
          if (res.transactions) {
            document.getElementById("result-transactions").textContent = JSON.stringify(res.transactions, undefined, 2);
          }
          if (res.mempoolBlocks) {
            document.getElementById("result-mempool-blocks").textContent = JSON.stringify(res.mempoolBlocks, undefined, 2);
          }
        });
        `,
          esModule: `
  const { %{0}: { websocket } } = mempoolJS();

  const ws = websocket.initServer({
    options: ["blocks", "stats", "mempool-blocks", "live-2h-chart"],
  });

  ws.on("message", function incoming(data) {
    const res = JSON.parse(data.toString());
    if (res.blocks) {
      console.log(res.blocks);
    }
    if (res.mempoolInfo) {
      console.log(res.mempoolInfo);
    }
    if (res.transactions) {
      console.log(res.transactions);
    }
    if (res.mempoolBlocks) {
      console.log(res.mempoolBlocks);
    }
  });
          `,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``,
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ''
        },
      },
      difficulty: {
        codeTemplate: {
          commonJS: `
        const { %{0}: { difficulty } } = mempoolJS();

        const difficultyAdjustment = await difficulty.getDifficultyAdjustment();

        document.getElementById("result").textContent = JSON.stringify(difficultyAdjustment, undefined, 2);
          `,
          esModule: `
  const { %{0}: { difficulty } } = mempoolJS();

  const difficultyAdjustment = await difficulty.getDifficultyAdjustment();
  console.log(difficultyAdjustment);
          `,
          curl: `/api/v1/difficulty-adjustment`,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `{
  progressPercent: 44.397234501112074,
  difficultyChange: 0.9845932018381687,
  estimatedRetargetDate: 1627762478.9111245,
  remainingBlocks: 1121,
  remainingTime: 665977.6261244365,
  previousRetarget: -4.807005268478962
}`
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `{
  progressPercent: 44.397234501112074,
  difficultyChange: 0.9845932018381687,
  estimatedRetargetDate: 1627762478.9111245,
  remainingBlocks: 1121,
  remainingTime: 665977.6261244365,
  previousRetarget: -4.807005268478962
}`
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `{
  progressPercent: 44.397234501112074,
  difficultyChange: 0.9845932018381687,
  estimatedRetargetDate: 1627762478.9111245,
  remainingBlocks: 1121,
  remainingTime: 665977.6261244365,
  previousRetarget: -4.807005268478962
}`
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `{
  progressPercent: 44.397234501112074,
  difficultyChange: 0.9845932018381687,
  estimatedRetargetDate: 1627762478.9111245,
  remainingBlocks: 1121,
  remainingTime: 665977.6261244365,
  previousRetarget: -4.807005268478962
}`
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `{
  progressPercent: 44.397234501112074,
  difficultyChange: 0.9845932018381687,
  estimatedRetargetDate: 1627762478.9111245,
  remainingBlocks: 1121,
  remainingTime: 665977.6261244365,
  previousRetarget: -4.807005268478962
}`
        },
      },
      stats: {
        codeTemplate: {
          commonJS: `
        const { %{0}: { statistics } } = mempoolJS();

        const stats = await statistics.getStats();

        document.getElementById("result").textContent = JSON.stringify(stats, undefined, 2);
          `,
          esModule: `
  const { %{0}: { statistics } } = mempoolJS();

  const stats = await statistics.getStats();
  console.log(stats);
          `,
          curl: `/api/stats`,
        },
        codeSampleMainnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleTestnet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleSignet: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleLiquid: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: ``
        },
        codeSampleBisq: {
          esModule: [],
          commonJS: [],
          curl: [],
          response: `{
  addresses: 213825,
  minted: 6148323.75,
  burnt: 1830262.66,
  spent_txos: 215705,
  unspent_txos: 2572
}`
        },
      },
    };

    this.network$.subscribe((network) => {
      this.active = (network === 'liquid') ? 2 : 0;
    });
  }

  wrapUrl(network: string, code: any, websocket: boolean = false) {

    let curlResponse = [];
    if (['', 'mainnet'].includes(network)){
      curlResponse = code.codeSampleMainnet.curl;
    }
    if (network === 'testnet') {
      curlResponse = code.codeSampleTestnet.curl;
    }
    if (network === 'signet') {
      curlResponse = code.codeSampleSignet.curl;
    }
    if (network === 'liquid') {
      curlResponse = code.codeSampleLiquid.curl;
    }
    if (network === 'bisq') {
      curlResponse = code.codeSampleBisq.curl;
    }

    let curlNetwork = '';
    if (this.env.BASE_MODULE === 'mempool') {
      if (!['', 'mainnet'].includes(network)) {
        curlNetwork = `/${network}`;
      }
    }

    let text = code.codeTemplate.curl;
    for (let index = 0; index < curlResponse.length; index++) {
      const curlText = curlResponse[index];
      const indexNumber = index + 1;
      text = text.replace('%{' + indexNumber + '}', curlText);
    }

    if (websocket) {
      const wsHostname = this.hostname.replace('https://', 'wss://');
      wsHostname.replace('http://', 'ws://');
      return `${wsHostname}${curlNetwork}${text}`;
    }
    return `${this.hostname}${curlNetwork}${text}`;
  }

}

