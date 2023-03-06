import PaymentCard from "./PaymentCard";

export default function PaymentsHistory() {
  // THIS IS TEST DATA, TO BE DELETED!
  let props = [];
  props.payments = [{
    "_id": {
      "$oid": "64010056df38280a58a1c1ca"
    },
    "title": "day",
    "description": "in the last day",
    "amount": 4,
    "categoryId": {
      "$oid": "6400ffc6df38280a58a1c1c5"
    },
    "userId": {
      "$oid": "6400ff30df38280a58a1c1c2"
    },
    "createdAt": {
      "$date": {
        "$numberLong": "1677787222089"
      }
    },
    "updatedAt": {
      "$date": {
        "$numberLong": "1677787222089"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "64010057df38280a58a1c1cd"
    },
    "title": "day",
    "description": "in the last day",
    "amount": 4,
    "categoryId": {
      "$oid": "6400ffc6df38280a58a1c1c5"
    },
    "userId": {
      "$oid": "6400ff30df38280a58a1c1c2"
    },
    "createdAt": {
      "$date": {
        "$numberLong": "1677787223754"
      }
    },
    "updatedAt": {
      "$date": {
        "$numberLong": "1677787223754"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "64010058df38280a58a1c1d0"
    },
    "title": "day",
    "description": "in the last day",
    "amount": 4,
    "categoryId": {
      "$oid": "6400ffc6df38280a58a1c1c5"
    },
    "userId": {
      "$oid": "6400ff30df38280a58a1c1c2"
    },
    "createdAt": {
      "$date": {
        "$numberLong": "1675368024180"
      }
    },
    "updatedAt": {
      "$date": {
        "$numberLong": "1675368024180"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "64010060df38280a58a1c1d3"
    },
    "title": "month",
    "description": "in the last day",
    "amount": 4,
    "categoryId": {
      "$oid": "6400ffc6df38280a58a1c1c5"
    },
    "userId": {
      "$oid": "6400ff30df38280a58a1c1c2"
    },
    "createdAt": {
      "$date": {
        "$numberLong": "1677700832416"
      }
    },
    "updatedAt": {
      "$date": {
        "$numberLong": "1672689632416"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "64010060df38280a58a1c1d6"
    },
    "title": "month",
    "description": "in the last day",
    "amount": 4,
    "categoryId": {
      "$oid": "6400ffc6df38280a58a1c1c5"
    },
    "userId": {
      "$oid": "6400ff30df38280a58a1c1c2"
    },
    "createdAt": {
      "$date": {
        "$numberLong": "1677700832723"
      }
    },
    "updatedAt": {
      "$date": {
        "$numberLong": "1672689632723"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "64010061df38280a58a1c1d9"
    },
    "title": "month",
    "description": "in the last day",
    "amount": 4,
    "categoryId": {
      "$oid": "6400ffc6df38280a58a1c1c5"
    },
    "userId": {
      "$oid": "6400ff30df38280a58a1c1c2"
    },
    "createdAt": {
      "$date": {
        "$numberLong": "1677700833015"
      }
    },
    "updatedAt": {
      "$date": {
        "$numberLong": "1672689633015"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "64010061df38280a58a1c1dc"
    },
    "title": "month",
    "description": "in the last day",
    "amount": 4,
    "categoryId": {
      "$oid": "6400ffc6df38280a58a1c1c5"
    },
    "userId": {
      "$oid": "6400ff30df38280a58a1c1c2"
    },
    "createdAt": {
      "$date": {
        "$numberLong": "1677700833335"
      }
    },
    "updatedAt": {
      "$date": {
        "$numberLong": "1672689633335"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "64010064df38280a58a1c1df"
    },
    "title": "year",
    "description": "in the last day",
    "amount": 4,
    "categoryId": {
      "$oid": "6400ffc6df38280a58a1c1c5"
    },
    "userId": {
      "$oid": "6400ff30df38280a58a1c1c2"
    },
    "createdAt": {
      "$date": {
        "$numberLong": "1646251236680"
      }
    },
    "updatedAt": {
      "$date": {
        "$numberLong": "1646251236680"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "64010064df38280a58a1c1e2"
    },
    "title": "year",
    "description": "in the last day",
    "amount": 4,
    "categoryId": {
      "$oid": "6400ffc6df38280a58a1c1c5"
    },
    "userId": {
      "$oid": "6400ff30df38280a58a1c1c2"
    },
    "createdAt": {
      "$date": {
        "$numberLong": "1646251236959"
      }
    },
    "updatedAt": {
      "$date": {
        "$numberLong": "1646251236959"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "64010065df38280a58a1c1e5"
    },
    "title": "year",
    "description": "in the last day",
    "amount": 4,
    "categoryId": {
      "$oid": "6400ffc6df38280a58a1c1c5"
    },
    "userId": {
      "$oid": "6400ff30df38280a58a1c1c2"
    },
    "createdAt": {
      "$date": {
        "$numberLong": "1646251237300"
      }
    },
    "updatedAt": {
      "$date": {
        "$numberLong": "1646251237300"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "64010065df38280a58a1c1e8"
    },
    "title": "year",
    "description": "in the last day",
    "amount": 4,
    "categoryId": {
      "$oid": "6400ffc6df38280a58a1c1c5"
    },
    "userId": {
      "$oid": "6400ff30df38280a58a1c1c2"
    },
    "createdAt": {
      "$date": {
        "$numberLong": "1646251237581"
      }
    },
    "updatedAt": {
      "$date": {
        "$numberLong": "1646251237581"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "64010065df38280a58a1c1eb"
    },
    "title": "year",
    "description": "in the last day",
    "amount": 4,
    "categoryId": {
      "$oid": "6400ffc6df38280a58a1c1c5"
    },
    "userId": {
      "$oid": "6400ff30df38280a58a1c1c2"
    },
    "createdAt": {
      "$date": {
        "$numberLong": "1646251237937"
      }
    },
    "updatedAt": {
      "$date": {
        "$numberLong": "1646251237937"
      }
    },
    "__v": 0
  },{
    "_id": {
      "$oid": "64010066df38280a58a1c1ee"
    },
    "title": "year",
    "description": "in the last day",
    "amount": 4,
    "categoryId": {
      "$oid": "6400ffc6df38280a58a1c1c5"
    },
    "userId": {
      "$oid": "6400ff30df38280a58a1c1c2"
    },
    "createdAt": {
      "$date": {
        "$numberLong": "1646251238292"
      }
    },
    "updatedAt": {
      "$date": {
        "$numberLong": "1646251238292"
      }
    },
    "__v": 0
  }]

  const rows = [];
  props.payments.forEach(e => {
    rows.push(<PaymentCard payment={e} />);
  });

  return (
    <div className="payments-container">
      <tbody>{rows}</tbody>
    </div>
  )
}