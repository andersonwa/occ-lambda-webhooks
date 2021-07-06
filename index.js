exports.handler = function(event, context, callback) {
  console.log(event.body);
  var occCheckoutData = JSON.parse(event.body);
  
  if (event.body && !occCheckoutData.hasOwnProperty('validationURL')) {
    var dataToOccCallback = {};
    var timestamp = new Date().getTime();
    timestamp = timestamp.toString();

    // PAGAMENTO COM CARTAO
    if (occCheckoutData.paymentMethod == "card") {
      if (occCheckoutData.transactionType == "0100") {
        var status = "1000";
        
        if (occCheckoutData.cardDetails && occCheckoutData.cardDetails.number && occCheckoutData.cardDetails.number.endsWith("2")) { 
         // status = "9000";
        }
        console.log(status)
        
        dataToOccCallback.orderId = occCheckoutData.orderId;
        dataToOccCallback.currencyCode = occCheckoutData.currencyCode;
        dataToOccCallback.transactionId = occCheckoutData.transactionId;
        dataToOccCallback.paymentId = occCheckoutData.paymentId;
        dataToOccCallback.amount = occCheckoutData.amount;
        dataToOccCallback.transactionType = occCheckoutData.transactionType;
        dataToOccCallback.hostTransactionTimestamp = "1447807667046";
        dataToOccCallback.transactionTimestamp = occCheckoutData.transactionTimestamp;
        dataToOccCallback.paymentMethod = occCheckoutData.paymentMethod;
        dataToOccCallback.gatewayId = occCheckoutData.gatewayId;
        dataToOccCallback.siteId = occCheckoutData.siteId;
        dataToOccCallback.authorizationResponse = {
          "responseReason": "teste2",
          "responseCode": status,
          "responseDescription": "1002",
          "authorizationCode": "s001",
          "hostTransactionId": "h001"
        };
        
        if (occCheckoutData.cardDetails.hasOwnProperty('saveCard') && occCheckoutData.cardDetails.saveCard) {
          dataToOccCallback.authorizationResponse.token = "211654684321";
        }
        
        dataToOccCallback.additionalProperties = {
          "PaymentId": "8b887ae2-3957-4b9f-8bd9-d70aee828b14",
          "ProofOfSale": "5038988",
          "AcquirerTransactionId": "0817045038988",
          "AuthorizationCode": "882452",
          "ReceivedDate": "2020-08-17 16:50:29",
          "CapturedAmount": "170100",
          "CapturedDate": "2020-08-17 16:50:29",
          "ReasonCode": "0",
          "ReasonMessage": "Successful",
          "Status": "1",
          "ProviderReturnCode": "4",
          "ProviderReturnMessage": "Operation Successful",
          "installments": "1",
          "comJuros": "false"
        };
        
        dataToOccCallback.customPaymentProperties = [
          "PaymentId",
          "ProofOfSale",
          "AcquirerTransactionId",
          "AuthorizationCode",
          "ReceivedDate",
          "CapturedAmount",
          "CapturedDate",
          "ReasonCode",
          "ReasonMessage",
          "Status",
          "ProviderReturnCode",
          "ProviderReturnMessage",
          "installments",
          "comJuros"
        ];
        
        
      } else {
        dataToOccCallback.orderId = occCheckoutData.orderId;
        dataToOccCallback.currencyCode = occCheckoutData.currencyCode;
        dataToOccCallback.transactionId = occCheckoutData.transactionId;
        dataToOccCallback.paymentId = occCheckoutData.paymentId;
        dataToOccCallback.amount = occCheckoutData.amount;
        dataToOccCallback.transactionType = occCheckoutData.transactionType;
        dataToOccCallback.hostTransactionTimestamp = "1447807667046";
        dataToOccCallback.transactionTimestamp = occCheckoutData.transactionTimestamp;
        dataToOccCallback.paymentMethod = occCheckoutData.paymentMethod;
        dataToOccCallback.gatewayId = occCheckoutData.gatewayId;
        
        dataToOccCallback.siteId = occCheckoutData.siteId;
        

        dataToOccCallback.channel = occCheckoutData.channel;
        dataToOccCallback.hostTransactionId = "h001";
        dataToOccCallback.locale = occCheckoutData.locale;

        
        dataToOccCallback.voidResponse = {
            "merchantTransactionId": "mID1464958982654v",
            "merchantTransactionTimestamp": timestamp,
            "hostTransactionTimestamp": "1447807667046",
            "amount": occCheckoutData.amount,
            "responseReason": "teste2",
            "responseCode": "2000", //2000
            "responseDescription": "1002",
            "hostTransactionId": "h001",
            "transactionId": occCheckoutData.transactionId,
            "transactionTimestamp": occCheckoutData.transactionTimestamp,
            "paymentId": occCheckoutData.paymentId,
            "paymentMethod":"card",
            "gatewayId":occCheckoutData.gatewayId
          };
        
      }


    // PAGAMENTO COM GIFTCARD
    } else if (occCheckoutData.hasOwnProperty('paymentRequests') && occCheckoutData.paymentRequests[0].paymentMethod == "physicalGiftCard") {
      if (occCheckoutData.transactionType == "0100") {
        var teste = {
          "transactionType": occCheckoutData.transactionType,
          "currencyCode": occCheckoutData.currencyCode,
          "locale": occCheckoutData.locale,
          "channel": occCheckoutData.channel,
          "siteId": occCheckoutData.siteId,
          "orderId": occCheckoutData.orderId,
          "authorizationResponse": [{
            "merchantTransactionTimestamp": timestamp,
            "responseCode": "9000",
            "hostTransactionId": "hID1464958982554",
            "transactionId": occCheckoutData.paymentRequests[0].transactionId,
            "paymentId": occCheckoutData.paymentRequests[0].paymentId,
            "responseDescription": "AuthResponseDescription",
            "merchantTransactionId": "mID1464958982654v",
            "amount": "000000011575",
            "hostTransactionTimestamp": timestamp,
            "responseReason": "AuthResponseReason",
            "transactionTimestamp": occCheckoutData.paymentRequests[0].transactionTimestamp,
            "paymentMethod": "physicalGiftCard",
            "gatewayId": occCheckoutData.paymentRequests[0].gatewayId
          }]
        }
        
         teste.additionalProperties = {
              "teste": "teste",
              "giftCardNumber": "12345"
            }
            
             teste.customPaymentProperties = ["teste", "giftCardNumber"];
        
        dataToOccCallback = teste;
      
      } else if (occCheckoutData.transactionType == "0110") {  
        var teste = {
          "transactionType": occCheckoutData.transactionType,
          "currencyCode": occCheckoutData.currencyCode,
          "locale": occCheckoutData.locale,
          "channel": occCheckoutData.channel,
          "siteId": occCheckoutData.siteId,
          "orderId": occCheckoutData.orderId,
          "voidResponse": [{
            "merchantTransactionTimestamp": timestamp,
            "responseCode": "2000",
            "hostTransactionId": "hID1464958982554",
            "transactionId": occCheckoutData.paymentRequests[0].transactionId,
            "paymentId": occCheckoutData.paymentRequests[0].paymentId,
            "responseDescription": "AuthResponseDescription",
            "merchantTransactionId": "mID1464958982654v",
            "amount": "000000011575",
            "additionalProperties": {
              "teste": "teste"
            },
            "hostTransactionTimestamp": timestamp,
            "responseReason": "AuthResponseReason",
            "transactionTimestamp": occCheckoutData.paymentRequests[0].transactionTimestamp,
            "paymentMethod": "physicalGiftCard",
            "gatewayId": occCheckoutData.paymentRequests[0].gatewayId
          }]
        }
          
        dataToOccCallback = teste;
      } else {
        var teste = {
          "transactionType": occCheckoutData.transactionType,
          "currencyCode": occCheckoutData.currencyCode,
          "locale": occCheckoutData.locale,
          "channel": occCheckoutData.channel,
          "siteId": occCheckoutData.siteId,
          "orderId": occCheckoutData.orderId,
          "inquireBalanceResponse":
          [{
            "merchantTransactionTimestamp": timestamp,
            "responseCode": "5000",
            "hostTransactionId": "hID1464958982554",
            "transactionId": occCheckoutData.paymentRequests[0].transactionId,
            "paymentId": occCheckoutData.paymentRequests[0].paymentId,
            "responseDescription": "AuthResponseDescription",
            "merchantTransactionId": "mID1464958982654v",
            "amount": "000000011575",
            "additionalProperties": {
              "teste": "teste",
            },
            "hostTransactionTimestamp": timestamp,
            "responseReason": "AuthResponseReason",
            "transactionTimestamp": occCheckoutData.paymentRequests[0].transactionTimestamp,
            "paymentMethod": "physicalGiftCard",
            "gatewayId": occCheckoutData.paymentRequests[0].gatewayId
          }]
        }
        
        dataToOccCallback = teste;
      }

    // PAGAMENTO COM BOLETO
    } else if (occCheckoutData.paymentMethod == "invoice") {
      dataToOccCallback.merchantTransactionTimestamp = timestamp;
      dataToOccCallback.currencyCode = occCheckoutData.currencyCode;
      dataToOccCallback.transactionId = occCheckoutData.transactionId;
      dataToOccCallback.PONumber = occCheckoutData.PONumber;
      dataToOccCallback.referenceNumber = occCheckoutData.referenceNumber;
      dataToOccCallback.organizationId = "";
      dataToOccCallback.amount = occCheckoutData.amount;
      dataToOccCallback.transactionType = occCheckoutData.transactionType;
      dataToOccCallback.siteId = occCheckoutData.siteId;
      dataToOccCallback.authorizationResponse = {
        "hostTransactionId": occCheckoutData.transactionId + occCheckoutData.orderId,
        "responseCode": "9000",
        "responseReason": "1002",
        "responseDescription": "Valid PO Number",
        "merchantTransactionId": occCheckoutData.transactionId
      };


      dataToOccCallback.additionalProperties = {
        "boletoUrl": "https://teste.com.br"
      };
      
      dataToOccCallback.customPaymentProperties = ["boletoUrl"];

      dataToOccCallback.transactionTimestamp = occCheckoutData.transactionTimestamp;
      dataToOccCallback.paymentMethod = occCheckoutData.paymentMethod;
      dataToOccCallback.orderId = occCheckoutData.orderId;
      dataToOccCallback.gatewayId = occCheckoutData.gatewayId;

    // PAGAMENTO GENERICO
    } else if (occCheckoutData.paymentMethod == "generic") {
      dataToOccCallback.orderId = occCheckoutData.orderId;
      dataToOccCallback.paymentId = occCheckoutData.paymentId;
      dataToOccCallback.merchantTransactionId = occCheckoutData.transactionId;
      dataToOccCallback.hostTimestamp = occCheckoutData.transactionTimestamp;
      dataToOccCallback.transactionType = occCheckoutData.transactionType;
      dataToOccCallback.transactionTimestamp = occCheckoutData.transactionTimestamp;
      dataToOccCallback.currencyCode = occCheckoutData.currencyCode;
      dataToOccCallback.hostTransactionId = occCheckoutData.transactionId + occCheckoutData.orderId;
      dataToOccCallback.gatewayId = occCheckoutData.gatewayId;
      dataToOccCallback.paymentMethod = occCheckoutData.paymentMethod;
      dataToOccCallback.amount = occCheckoutData.amount;

      dataToOccCallback.additionalProperties = {
        "teste": "https://teste.com.br",
        "paymentType": "linkCielo"
      };
      
      dataToOccCallback.customPaymentProperties = ["teste", "paymentType"];

      dataToOccCallback.response = {
        "success": false,
        "description": "9001",
        "code": "1000",
        "reason": "s001"
      };
    } else if (occCheckoutData.paymentMethod == "cash") {
      dataToOccCallback.orderId = occCheckoutData.orderId;
        dataToOccCallback.currencyCode = occCheckoutData.currencyCode;
        dataToOccCallback.transactionId = occCheckoutData.transactionId;
        dataToOccCallback.paymentId = occCheckoutData.paymentId;
        dataToOccCallback.amount = occCheckoutData.amount;
        dataToOccCallback.transactionType = occCheckoutData.transactionType;
        dataToOccCallback.hostTransactionTimestamp = "1447807667046";
        dataToOccCallback.transactionTimestamp = occCheckoutData.transactionTimestamp;
        dataToOccCallback.paymentMethod = occCheckoutData.paymentMethod;
        dataToOccCallback.gatewayId = occCheckoutData.gatewayId;
        dataToOccCallback.siteId = occCheckoutData.siteId;
        

       dataToOccCallback.referenceNumber = occCheckoutData.referenceNumber;
       dataToOccCallback.hostTimestamp = "1447807667046";
       dataToOccCallback.merchantTransactionTimestamp = "1447807667046";
       
       dataToOccCallback.customPaymentProperties = [
        "externalId",
        "rsvEstimatedDeliveryDate",
        "rsvGiftCardNumber",
        "rsvGiftCardPin",
        "rsvGiftCardAmount",
        "paymentType",
        "rsvGiftCardNumberFull",
        "successInConfirmation",
        "autorizacao",
        "nsu",
        "nsuHost"
      ];
      
      dataToOccCallback.additionalProperties = {
        "paymentType": "giftcard",
        "externalId": "2000777",
        "successInConfirmation": "true",
        "rsvGiftCardNumberFull": "6367030204444815 ",
        "rsvGiftCardNumber": "6367030204444815 ",
        "rsvGiftCardPin": "2731",
        "rsvGiftCardAmount": "000000002369"
      }

        
        dataToOccCallback.authorizationResponse = {
          "hostTransactionId": "o29200214-pg17110143-1612895392418",
          "responseCode": "1000",
          "responseReason": "1001",
          "responseDescription": "Sua compra foi realizada com sucesso.",
          "authorizationCode": "s001"
        };
    }
  
    dataToOccCallback = JSON.stringify(dataToOccCallback);
    console.log(dataToOccCallback);
    callback(null, { "body": dataToOccCallback, "statusCode": 200 });
  } else {
    var axios = require("axios");
    var https = require('https');
    var fs = require('fs');
    var path = require('path');
    var certFilePath = path.resolve(__dirname, './applepaytls.pem');
    var keyFilePath = path.resolve(__dirname, './certificate.key');

    const httpsAgent = new https.Agent({
      rejectUnauthorized: false, // (NOTE: this will disable client verification)
      cert: fs.readFileSync(certFilePath),
      key: fs.readFileSync(keyFilePath)
    });
      
    axios({
      method: 'POST',
      url: occCheckoutData.validationURL,
      data:{
        merchantIdentifier: occCheckoutData.merchantIdentifier,
        displayName: occCheckoutData.displayName,
        initiative: "web",
        initiativeContext: occCheckoutData.initiativeContext
      },
      httpsAgent: httpsAgent
    })
    .then(function(response) {
      console.log(response.data);
      callback(null, { "body": JSON.stringify(response.data), "statusCode": 200, headers: {
        "Access-Control-Allow-Headers" : "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }});
    })
    .catch(function(error) {
      console.log(error)
      callback(null, { "body": "oi", "statusCode": 200 });
    })
  }
};


exports.handler = function(event, context, callback) {
    console.log(context.body);
    var bodyParsed = JSON.parse(context.body);
    var userContext = JSON.parse(bodyParsed.request.contextData.userContext);
    
    if (!userContext.hasOwnProperty('naoAssociado')) {
      var lala = {
        "defaultAdditionalPriceListGroups": [
          "2",
          "4"
        ],
        "defaultPriceListGroup": "2",
        "defaultCatalog": "cloudCatalog",
        "message": "use this data",
        "responseCode": 1
      }
    } else {
      var defaultPrice = userContext.naoAssociado ?  "precoPadrao" : "precoAssociado";
      var lala = {
        "defaultAdditionalPriceListGroups": [
          "precoPadrao",
          "precoAssociado"
        ],
        "defaultPriceListGroup": defaultPrice,
        "defaultCatalog": "cloudCatalog",
        "message": "use this data",
        "responseCode": 1
      }
    }

    
    callback(null, { body: JSON.stringify(lala), "statusCode": 200 });
};
