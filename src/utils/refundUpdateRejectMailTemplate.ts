import {RefundUpdateDto} from "../refund/dto/update-refund.dto";

export const refundUpdateRejectMailTemplate = (refundUpdateDto: RefundUpdateDto) => {
    const template = `
        <html>
           <head>
                <meta charset="UTF-8" />
                <title>Odrzuciliśmy Twoje rządanie zwrotu</title>
           </head>
          <body>
            <div>
                <p>
              <strong>Witaj, ${refundUpdateDto.email} </strong>
            </p>
            <p>Chcieliśmy Cię poinformować, że status Twojego zgłoszenia zwrotu został zaktualizowany.</p>
            <p><strong>Nowy status: </strong>${refundUpdateDto.status}</p>
            <br>
            <p><strong>Przyczyna odrzucenia:</strong>${refundUpdateDto.updateReason}</p>
            
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