import React from 'react';
import html2canvas from 'html2canvas';
import agent from "../API/Agent";


type ExportButtonProps = {
  targetRef: React.RefObject<HTMLDivElement>;
};

function ExportButton({ targetRef }: ExportButtonProps) {
    const saveAsImage = () => {
        if (targetRef.current) {
            html2canvas(targetRef.current, { scale: 2 }).then(canvas => {
                const imageData = canvas.toDataURL("image/png", 1.0);
                agent.DashboardAPI.saveImageToPDF(imageData)
                    .then((response) => {
                        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'analysis.pdf');
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    })
                    .catch(error => {
                        console.error("Error saving image to PDF:", error);
                    });
            });
        }
    };
    
    

  return (
    <button className="button-secondary border-solid" onClick={saveAsImage}>
      تصدير نتيجة التحليل
    </button>
  );
}

export default ExportButton;
