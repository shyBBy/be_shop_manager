

export const mailTemplate = (tracking_url: any) => {
    const template = `
        <html>
           <head>
                <meta charset="UTF-8" />
                <title>Śledź paczke!</title>
            </head>
          <body>
            <p>
              <strong>Kliencie,</strong>
            </p>
            <p>Twoje zamówienie zostało wysłane. Udostępniam Ci specjalny link po przez, który będziesz mógł sprawdzać status swojej przesyłki. 
            
            <p><strong>ŚLEDŹ PRZESYŁKĘ: </strong>${tracking_url}</p>
            <p>W przypadku jakichkolwiek pytań prosimy o kontakt po przez wysłanie e-mail klikając w tekst po prawej.<a href="mailto:bigsewciushop@gmail.com">Wyślij e-mail.</a></p>
            <p>Dziękujemy za wybór naszego sklepu i zapraszamy do kolejnych zakupów</p>
            <p>Zespół Obsługi Klienta BIGSEWCIU.SHOP</p>
          </body>
        </html>
    `
    return template
}
