# Receipt Processor Challenge

Developed using Node and TypeScript

## Dependencies

- node
- express
- routing-controllers

## Getting started

- run `docker compose up --build`

## Examples

```
curl -X 'POST' \
  'http://localhost:3000/receipts/process' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "retailer": "M&M Corner Market",
  "purchaseDate": "2022-03-20",
  "purchaseTime": "14:33",
  "items": [
    {
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    }
  ],
  "total": "9.00"
}'

200
{"id": "10ef3184-f293-40c6-b3b3-fda097e9025c"}

curl -X 'GET' \
  'http://localhost:3000/receipts/10ef3184-f293-40c6-b3b3-fda097e9025c/points' \
  -H 'accept: application/json'

200
{"points": 109}
```

```
curl -X 'POST' \
  'http://localhost:3000/receipts/process' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}'

200
{"id": "da19d515-b57f-47ca-b08b-e940c3a5c5a2"}

curl -X 'GET' \
  'http://localhost:3000/receipts/da19d515-b57f-47ca-b08b-e940c3a5c5a2/points' \
  -H 'accept: application/json'

200
{"points": 28}
```

```
curl -X 'POST' \
  'http://localhost:3000/receipts/process' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "retailer": "Target",
    "purchaseDate": "2022-01-02",
    "purchaseTime": "13:13",
    "total": "1.25",
    "items": [
        {"shortDescription": "Pepsi - 12-oz", "price": "1.25"}
    ]
}'

200
{"id": "732bcffb-8b2f-4e92-beb6-1feaf0c9d38f"}

curl -X 'GET' \
  'http://localhost:3000/receipts/732bcffb-8b2f-4e92-beb6-1feaf0c9d38f/points' \
  -H 'accept: application/json'

200
{"points": 31}
```

```
curl -X 'POST' \
  'http://localhost:3000/receipts/process' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "retailer": "Walgreens",
    "purchaseDate": "2022-01-02",
    "purchaseTime": "08:13",
    "total": "2.65",
    "items": [
        {"shortDescription": "Pepsi - 12-oz", "price": "1.25"},
        {"shortDescription": "Dasani", "price": "1.40"}
    ]
}'

200
{"id": "54f778b7-8642-41b6-967e-f5e70f9c7156"}

curl -X 'GET' \
  'http://localhost:3000/receipts/54f778b7-8642-41b6-967e-f5e70f9c7156/points' \
  -H 'accept: application/json'

200
{"points": 15}
```
