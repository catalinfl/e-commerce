import React from 'react'
import './Searchpage.scss'
import { Checkbox } from 'pretty-checkbox-react'
import '@djthoms/pretty-checkbox';
import CardProduct from '../Card/CardProduct';

const Searchpage: React.FC = () => {
  return (
    <div className="searchpage">
        <p className="searchCategory"> IT / Calculatoare / <span className="searchC"> Test </span> </p>
      <div className="searchpageContainer">
        <div className="searchpageCheckContainers">
            <div className="searchpageItem">
              <h3 className="searchpageCategories"> Disponibilitate </h3>
                <div className="searchpageItemCheckbox">
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla </Checkbox>
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla </Checkbox>
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla </Checkbox>
                </div>
            </div>
            <div className="searchpageItem">
              <h3 className="searchpageCategories"> Pret </h3>
              <div className="searchpageItemCheckbox">
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla </Checkbox>
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla </Checkbox>
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla </Checkbox>
              </div>
            </div>
            <div className="searchpageItem">
              <h3 className="searchpageCategories"> Brand </h3>
              <div className="searchpageItemCheckbox">
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla (1) </Checkbox>
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla (2) </Checkbox>
                  <Checkbox shape="curve"  animation="smooth" color="success"> blabla (65)</Checkbox>
            </div>
          </div>
          </div>
          <div className="searchpageItemsSearched">
              <p className="searchpageResultTitle">
              &#127774; Rezultate cautare: Nume Cautare
              </p>
              <div className="searchpageSort">
                <p> Sorteaza dupa: </p>
                <select className="searchpageSelection" id="selection">
                  <option className="searchpageOption"  value="relevanta"> Relevanta </option> 
                  <option className="searchpageOption"  value="nume"> Nume </option> 
                  <option className="searchpageOption"  value="crescator"> Crescator </option> 
                  <option className="searchpageOption"  value="descrescator"> Descrescator </option> 
                  <option className="searchpageOption"  value="relevanta"> Cele mai vandute </option> 
                  <option className="searchpageOption"  value="relevanta"> Cel mai mare discount </option> 
                </select>
              </div>
              <div className="searchpageItemsContainer">
                <div className="searchpageItemsFound">
                  <CardProduct />
                  <CardProduct />
                  <CardProduct />
                  <CardProduct />
                </div>
                <div className="searchpageItemsFound">
                  <CardProduct />
                  <CardProduct />
                  <CardProduct />
                  <CardProduct />
                </div>
                <div className="searchpageItemsFound">
                  <CardProduct />
                  <CardProduct />
                  <CardProduct />
                  <CardProduct />
                </div>
                <div className="searchpageItemsFound">
                  <CardProduct />
                  <CardProduct />
                  <CardProduct />
                  <CardProduct />
                </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Searchpage