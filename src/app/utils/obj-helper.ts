export class ObjHelper {
    public static copyObject(sourceObj, targetObj)
    {
        if (sourceObj) {
            // tslint:disable-next-line:no-var-keyword
            // tslint:disable-next-line:forin
            for (var k in sourceObj) {
                targetObj[k] = sourceObj[k];
            }
        }
    }

    public static dateToInt(d)
    {
        var intDate=0;

        if(d)
        {
            intDate = d.getFullYear() * 10000 + (d.getMonth() +1) * 100 + d.getDate();
        }

        return intDate;
    }

    public static intToDate(i)
    {
        var returnDate = null;

        if(i>0)
        {
            var iString = i.toString();

            var yearStr = iString.substring(0,4);
            var monthStr = iString.substring(4,6);
            var dayStr = iString.substring(6,8);

            returnDate =  new Date(parseInt(yearStr), parseInt(monthStr) -1, parseInt(dayStr))
        }

        return returnDate;
    }
}
