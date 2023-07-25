import {RefundCreateDto} from "../refund/dto/create-refund.dto";

export const refundCreatedMailTemplate = (refundData: RefundCreateDto, refundUuid: string) => {

    const template = `
        <html>
           <head>
                <meta charset="UTF-8" />
                <title>Potwierdzenie złożenia zwrotu towaru!</title>
           </head>
          <body>
            <div>
                <p>
              <strong>Witaj, ${refundData.email} </strong>
            </p>
            <p>Dziękujemy za złożenie formularza zwrotu produktu w naszym sklepie internetowym. Twoje zadowolenie jest dla nas najważniejsze, dlatego chcemy, aby cały proces zwrotu przebiegł jak najbardziej sprawnie. </p>
            <br>
            <p>Potwierdzamy otrzymanie Twojego zgłoszenia, które teraz zostanie poddane weryfikacji przez nasz zespół ds. zwrotów. Będziemy na bieżąco informować Cię o postępach i aktualizacjach związanych z Twoim zwrotem za pośrednictwem tego samego adresu e-mail, na którym otrzymujesz tę wiadomość. Dodatkowo, będziesz miał możliwość śledzenia statusu zwrotu, logując się na swoje konto na naszej stronie.</p>
            <br>
            
            <p><a href="https://www.zwroty.bigsewciu.shop/refund/${refundUuid}">KLIKNIJ TUTAJ</a>, aby śledzić historię i aktualny status Twojego zgłoszenia zwrotu.</p><br>
            
            <p>Musisz teraz poczekać na sprawdzenie zgłoszenia przez Nasz zespół. Jak to zrobimy poinformujemy Cię drogą mailową lub sam możesz to sprawdzić po przez link powyżej. Jeśli Cię nie poprosimy o wysyłkę zwracanych produktów nie rób tego sam!</p>
            
            <p>Jeśli masz jakiekolwiek pytania lub potrzebujesz dodatkowych informacji, skontaktuj się z naszym zespołem obsługi klienta. <a href="mailto:bigsewciushop@gmail.com">Wyślij e-mail.</a></p>
            
            <p>Pozdrawiamy,
            <br>
            Zespół Obsługi Klienta
            </p>
            </div>
          </body>
        </html>
`

    return template

}