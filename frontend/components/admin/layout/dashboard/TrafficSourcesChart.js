// TrafficSourcesChart.js
import React from "react";

const TrafficSourcesChart = () => {
  return (
    <div className="px-4 py-5 sm:p-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <p className="text-base font-bold text-gray-900">Traffic Sources</p>

        <div className="mt-4 sm:mt-0">
          <div>
            <label htmlFor="" className="sr-only">
              {" "}
              Duration{" "}
            </label>
            <select
              name=""
              id=""
              className="block w-full py-0 pl-0 pr-10 text-base border-none rounded-lg focus:outline-none focus:ring-0 sm:text-sm"
            >
              <option>Last 7 days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Direct</p>
            <p className="text-sm font-medium text-gray-900">1,43,382</p>
          </div>
          <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
            <div className="absolute inset-y-0 left-0 bg-indigo-600 rounded-full w-[60%]"></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Referral</p>
            <p className="text-sm font-medium text-gray-900">87,974</p>
          </div>
          <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
            <div className="absolute inset-y-0 left-0 bg-indigo-600 rounded-full w-[50%]"></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Social Media</p>
            <p className="text-sm font-medium text-gray-900">45,211</p>
          </div>
          <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
            <div className="absolute inset-y-0 left-0 bg-indigo-600 rounded-full w-[30%]"></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Twitter</p>
            <p className="text-sm font-medium text-gray-900">21,893</p>
          </div>
          <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
            <div className="absolute inset-y-0 left-0 bg-indigo-600 rounded-full w-[15%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficSourcesChart;
