import React, { useEffect } from 'react'

function ListUpdate() {
    useEffect(() => {
        window.scrollTo(0, 0);
        $('#summernote').summernote({
          placeholder: 'Enter Task List',
          tabsize: 2,
          height: 400
        });
      }, []);

      const updateList = () => {
        const updatedList = $('#summernote').summernote('code');
        // const sourceLiElements = $(updatedList).find('li');
        const sourceLiElements = $('ul li:contains("Today will be done:")');
        const targetLiElements = $('ul li:contains("Today\'s progress:")');

        // for (let i = 0; i < sourceLiElements.length; i++) { 
        //   const sourceLiElement = sourceLiElements[i];
        //   const targetLiElement = targetLiElements[i];
        //   const sourceLiElementText = $(sourceLiElement).text();
        //   const targetLiElementText = $(targetLiElement).text();
        //   const sourceLiElementTextArray = sourceLiElementText.split(":");
        //   const targetLiElementTextArray = targetLiElementText.split(":");
        //   const sourceLiElementTextArrayValue = sourceLiElementTextArray[1].replace("%", "");
        //   const targetLiElementTextArrayValue = targetLiElementTextArray[1].replace("%", "");
        //   const sourceLiElementTextArrayValueInt = parseInt(sourceLiElementTextArrayValue);
        //   const targetLiElementTextArrayValueInt = parseInt(targetLiElementTextArrayValue);
        //   const progress = sourceLiElementTextArrayValueInt - targetLiElementTextArrayValueInt;
        //   const progressText = progress + "%";
        //   $(targetLiElement).text("Today's progress: " + progressText);
        // }
        sourceLiElements.each(function (index) {
          const dynamicValue = $(this).text().split(': ')[1];
          $(targetLiElements[index]).html("<strong>Today's progress: " + dynamicValue + '</strong>');
        });
    
        const sourceLiElements2 = $('ul li:contains("Estimated")');
    
        const targetLiElements2 = $('ul li:contains("Actual")');
    
        sourceLiElements2.each(function (index) {
          const dynamicValue = $(this).text().split(': ')[1];
          $(targetLiElements2[index]).html("<strong>Actual hours: " + dynamicValue + '</strong>');
        });
    
        const updatedList2 = $('#summernote').summernote('code');
        $('#output').html(updatedList2);
      };
  return (
    <>
      <div className="container mt-5 mb-5">
          <div className="row">
          <div className="col-md-6">
                        <div id="summernote"></div> <br />
                        <button type="button" className="btn btn-outline-primary w-100" id="update_list" onClick={updateList}>Update Report</button>
              </div>

              <div className="col-sm-6">
              <div id="output"></div>
              </div>
          </div>
      </div>
    </>
  )
}

export default ListUpdate