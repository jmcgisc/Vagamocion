import Hero from "../components/Hero";
import React from "react";
import { useEffect, useState } from "react";

export default function Disclaimer() {
  return (
      <div>
        <Hero/>
        <section className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 px-6 py-20">

        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl py-16 font-extrabold mb-2 text-center text-primary dark:text-white">
                Aviso Legal / Disclaimer
            </h1>

            <div className="space-y-4 text-justify text-base leading-relaxed">
            <p>
                Bienvenido a Vagamocion Travel. Al utilizar este sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso, los cuales, junto con nuestra política de privacidad, rigen nuestra relación con usted en relación con este sitio web.
            </p>

            <p>
            TODOS LOS PRECIOS PUBLICADOS EN ESTE SITIO WEB SON DE CARÁCTER REFERENCIAL E INFORMATIVO. NINGUNO DE LOS PRECIOS QUE SE PUBLICAN SON DE CARACTER FINAL O DEFINITIVO EN TANTO EL CLIENTE NO SOLICITE UNA COTIZACION FORMAL MISMA QUE SE ELABORA Y ENTREGA DE ACUERDO A SUS PROPIOS INTERESES, REQUERIMIENTOS Y PRESUPUESTO. Los precios son referenciales e informativos dado que se sujetan a requerimientos específicos del cliente como son entre otros, sin ser limitativos: clase de vuelos; categoría de hoteles; clase de ocupación sencilla, doble triple, etc edades de los clientes; condiciones especiales que ameriten contratación de servicios especiales o particulares; temporalidad en la que se viaja y otro sin número de condiciones, características y particularidades que le son muy propias de cada uno de nuestros clientes. Toda cotización se elabora en base a estas condiciones y una vez que el cliente cuenta con ella es de nuestra la responsabilidad y obligación de dar cabal cumplimiento al precio y a los servicios que se contratan. Toda cotización se sujeta a su debido contrato, mismo que se anexa a la cotización misma. Toda la información de la cotización en su conjunto determina la libre decisión por parte de el cliente para cotntratar en dichos términos.
            </p>

            <p>
                Los enlaces externos que pueden aparecer en este sitio son proporcionados para su conveniencia. No tenemos control sobre el contenido de esos sitios y no asumimos responsabilidad alguna por su contenido.
            </p>

            <p>
                Todos los derechos de propiedad intelectual sobre el contenido, diseño, gráficos y otros materiales del sitio pertenecen a Vagamocion Travel, a menos que se indique lo contrario.
            </p>

            <p>
                El uso no autorizado de este sitio web puede dar lugar a una reclamación por daños y perjuicios y/o constituir un delito.
            </p>
        </div>
      </div>
    </section>
    </div>
   
  );
}