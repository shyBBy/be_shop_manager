import {RefundUpdateDto} from "../refund/dto/update-refund.dto";

export const refundUpdateSuccessMailTemplate = (refundUpdateDto: RefundUpdateDto) => {
    const template = `
        <html>
           <head>
                <meta charset="UTF-8" />
                <title>Zaakceptowaliśmy Twóje żądanie zwrotu!</title>
           </head>
          <body>
            <div>
                <p>
              <strong>Witaj, ${refundUpdateDto.email} </strong>
            </p>
            <p>Chcieliśmy Cię poinformować, że status Twojego zgłoszenia zwrotu został zaktualizowany.</p>
            <p><strong>Nowy status: </strong>${refundUpdateDto.status}</p>
            <br>
            <p><strong>Następne kroki, które musisz wykonać, to:</strong></p>
            
            <ol>
                <li>Przygotuj produkt, zabezpiecz go i zapakuj starannie, aby uniknąć uszkodzeń podczas transportu.</li>
                <li>Opłać przesyłkę za pomocą dowolnego przewoźnika, który jest dla Ciebie wygodny.</li>
                <li>Wyślij paczkę na poniższy adres:<br>
                    <address>
                        <strong>BIGSEWCIU SEWERYN KISIEL</strong><br>
                        Ul. Wójtowska 9<br>
                        95-030 Starowa Góra<br>
                        Polska<br>
                        tel: +48 573-105-685
                    </address>
                </li>
                <li>Po wysłaniu paczki, prosimy o poinformowanie nas o tym, wraz z podaniem numeru przesyłki, co pozwoli nam lepiej śledzić status zwrotu.</li>
                <li>Po otrzymaniu paczki, zostanie ona dokładnie zweryfikowana przez nasz zespół. W przypadku akceptacji, pieniądze zostaną zwrócone w taki sam sposób, w jaki została dokonana płatność za zamówienie.</li>
            </ol><br>
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